import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from ".."
import { api } from "../../api/api"
import { addLike, OwnPost, removeLike } from "../posts/posts"
import { UserInfo } from "../user/user"

export interface ProfileState {
    userInfo: UserInfo | null
    userPosts: OwnPost[] | null
}

const initialState: ProfileState = {
    userInfo: null,
    userPosts: null
}

export const loadUserData = createAsyncThunk(
    'profile/loadUserData',
    async (payload: number) => {
        const [userInfo, userPosts] = await Promise.all([
            api.getUserInfo(payload),
            api.getUserPosts(payload),
        ])
        return { userInfo, userPosts }
    }
)

export const subscribe = createAsyncThunk(
    'profile/subscribe',
    async (idUser: number) => {
        await api.subscribe(idUser)
        return idUser
    }
)

export const unsubscribe = createAsyncThunk(
    'profile/unsubscribe',
    async (idUser: number) => {
        await api.unsubscribe(idUser)
        return idUser
    }
)

const profileSlice = createSlice ({
    name: 'profile',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(loadUserData.fulfilled, (state, action) => {
                state.userInfo = action.payload.userInfo
                state.userPosts = action.payload.userPosts
            })
            .addCase(subscribe.fulfilled, (state) => {
                if (!state.userInfo) return
                state.userInfo.isSubscription = 1
            })
            .addCase(unsubscribe.fulfilled, (state) => {
                if (!state.userInfo) return
                state.userInfo.isSubscription = 0
            })
            .addCase(addLike.fulfilled, (state, action) => {
                if (!state.userPosts) return
                const post = state.userPosts.find(p => p.id === action.payload)
                if (!post || post.hasLike) return
                post.hasLike = 1
                post.likes++
            })
            .addCase(removeLike.fulfilled, (state, action) => {
                if (!state.userPosts) return
                const post = state.userPosts.find(p => p.id === action.payload)
                if (!post || !post.hasLike) return
                post.hasLike = 0
                post.likes--
            })
    },
})

export const selectUserInfo = (state: RootState) => state.profile.userInfo
export const selectUserPosts = (state: RootState) => state.profile.userPosts

export default profileSlice.reducer
