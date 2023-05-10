import { Avatar, Box, Button, CircularProgress, TextField, Typography } from "@mui/material"
import { useEffect } from "react"
import { connect, ConnectedProps } from "react-redux"
import { useParams } from "react-router"
import { AppDispatch, RootState } from "../../../store"
import { changeNewMessageText, loadChatByUser, loadPartnerInfo, selectMessagesByUser, selectNewMessage, selectPartnerInfo, selectSelectedPartner, sendNewMessage, setSelectedPartner } from "../../../store/messages/messages"
import s from './ChatPageBlock.module.scss'

const ChatPageBlock: React.FC<Props> = ({
    messages,
    selectedPartner,
    partnerInfo,
    newMessage,
    loadMessages,
    loadPartnerInfo,
    setSelectedPartner,
    changeNewMessageText,
    sendNewMessage
}) => {
    const idPartner = +(useParams().id as string)
    useEffect(() => {
        setSelectedPartner(idPartner)
        return () => {
            setSelectedPartner(null)
        }
    }, [idPartner])
    useEffect(() => {
        if (selectedPartner !== null && partnerInfo === null) {
            loadPartnerInfo()
        }
    }, [selectedPartner])
    useEffect(() => {
        if (!messages) {
            loadMessages()
        }
    }, [])

    return <>
        {messages === null && (
            <CircularProgress />
        )}
        {messages && <>
            <div className={s.chatWrapper}>
                <Box>
                    {partnerInfo && <Box display="flex" alignItems="center">
                        <Box>
                            <Avatar />
                        </Box>
                        <Box ml={2} flex="1">
                            <Typography variant="subtitle2">
                                {partnerInfo.name} {partnerInfo.surname}
                            </Typography>
                        </Box>
                    </Box>}
                </Box>
                <div className={s.messagesArea}>
                    <div className={s.messagesContainer}>
                        {messages.map(m => (
                            <div
                                key={m.id}
                                className={`${s.message} ${m.ownMessage ? s.ownMessage : s.partnerMessage}`}
                            >
                                <div>{m.text}</div>
                                <div className={s.date}>{m.created}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={s.formArea}>
                    <Box display="flex" alignItems="flex-start">
                        <TextField
                            multiline
                            fullWidth
                            size="small"
                            value={newMessage.text}
                            onChange={(e) => changeNewMessageText(e.currentTarget.value)}
                        />
                        <Button
                            variant="contained"
                            sx={{ marginLeft: '15px' }}
                            onClick={sendNewMessage}
                        >
                            Отправить
                        </Button>
                    </Box>
                </div>
            </div>
        </>}
    </>
}

const mapState = (state: RootState) => {
    return {
        messages: selectMessagesByUser(state),
        partnerInfo: selectPartnerInfo(state),
        selectedPartner: selectSelectedPartner(state),
        newMessage: selectNewMessage(state)
    }
}

const mapDispatch = (dispatch: AppDispatch) => {
    return {
        setSelectedPartner: (id: number | null) => dispatch(setSelectedPartner(id)),
        loadPartnerInfo: () => dispatch(loadPartnerInfo()),
        loadMessages: () => dispatch(loadChatByUser()),
        changeNewMessageText: (s: string) => dispatch(changeNewMessageText(s)),
        sendNewMessage: () => dispatch(sendNewMessage())
    }
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

export default connector(ChatPageBlock)
