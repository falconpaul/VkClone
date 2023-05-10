import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."
import { api } from "../../api/api"
import { UserInfo } from "../user/user"

type Chat = {
    partner_id: number
    last_message_id: number
    text: string
    created: string
    updated: string
    ownMessage: 1 | 0
    user: UserInfo
}

type Message = {
    id: number
    text: string
    created: string
    updated: string
    ownMessage: 1 | 0
}

type NewMessage = {
    text: string
}

export interface MessagesState {
    allChats: Chat[] | null
    historyByIdUser: Record<number, Message[]>
    selectedPartner: number | null
    partnerInfo: UserInfo | null
    newMessage: NewMessage
}

const initialState: MessagesState = {
    allChats: null,
    historyByIdUser: {},
    selectedPartner: null,
    partnerInfo: null,
    newMessage: {
        text: ''
    }
}

export const loadAllChats = createAsyncThunk(
    'messages/loadAllChats',
    async () => {
        const chats = await api.getAllChats() as Chat[]
        if (chats.length === 0) return []
        const partners = chats.map(c => c.partner_id)
        const users = await api.getUsersInfo(partners)
        chats.forEach(c => {
            c.user = users[c.partner_id]
        })
        return chats
    }
)

export const loadChatByUser = createAsyncThunk(
    'messages/loadChatByUser',
    async (payload, { getState }) => {
        const { selectedPartner } = (getState() as RootState).messages
        if (!selectedPartner) {
            throw new Error('Не выбран пользователь')
        }
        const messages = await api.getMessages(selectedPartner)
        return { [selectedPartner]: messages }
    }
)

export const loadPartnerInfo = createAsyncThunk(
    'messages/loadPartnerInfo',
    async (payload, { getState }) => {
        const { selectedPartner } = (getState() as RootState).messages
        if (!selectedPartner) {
            throw new Error('Не выбран пользователь')
        }
        return await api.getUserInfo(selectedPartner) as UserInfo
    }
)

export const sendNewMessage = createAsyncThunk(
    'messages/sendNewMessage',
    async (payload, { getState }) => {
        const { newMessage, selectedPartner } = (getState() as RootState).messages
        if (!selectedPartner) {
            throw new Error('Не выбран пользователь')
        }
        if (!newMessage.text) {
            throw new Error('Пустой текст')
        }
        return await api.sendNewMessage({
            idUserTo: selectedPartner,
            text: newMessage.text
        }) as Message
    }
)

const messagesSlice = createSlice ({
    name: 'messages',
    initialState,
    reducers: {
        setSelectedPartner: (state, action: PayloadAction<number | null>) => {
            const id = action.payload
            state.selectedPartner = id
            if (id !== null) {
                state.partnerInfo = state.allChats?.find(c => c.partner_id === id)?.user || null
            } else {
                state.partnerInfo = null
            }
        },
        changeNewMessageText: (state, action: PayloadAction<string>) => {
            state.newMessage.text = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(loadAllChats.fulfilled, (state, action) => {
            state.allChats = action.payload
        }).addCase(loadChatByUser.fulfilled, (state, action) => {
            Object.assign(state.historyByIdUser, action.payload)
        }).addCase(loadPartnerInfo.fulfilled, (state, action) => {
            state.partnerInfo = action.payload
        }).addCase(sendNewMessage.fulfilled, (state, action) => {
            if (!state.selectedPartner) return
            const message = action.payload
            if (state.allChats) {
                const chat = state.allChats.find(c => c.partner_id === state.selectedPartner)
                if (chat) {
                    chat.last_message_id = message.id
                    chat.ownMessage = 1
                    chat.text = message.text
                    chat.created = message.created
                    chat.updated = message.updated
                }
            }
            state.historyByIdUser[state.selectedPartner].push(message)
            state.newMessage = {
                text: ''
            }
        })
    },
})

export const selectAllChats = (state: RootState) => state.messages.allChats
export const selectMessagesByUser = (state: RootState) => {
    const id = state.messages.selectedPartner
    if (id === null) return undefined
    return state.messages.historyByIdUser[id]
}
export const selectSelectedPartner = (state: RootState) => state.messages.selectedPartner
export const selectPartnerInfo = (state: RootState) => state.messages.partnerInfo
export const selectNewMessage = (state: RootState) => state.messages.newMessage

export const { setSelectedPartner, changeNewMessageText } = messagesSlice.actions

export default messagesSlice.reducer
