import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { api } from "../../api/api";
import { subscribe, unsubscribe } from "../profile/profile";
import { UserInfo } from "../user/user";

interface FriendsState {
    friendsList: UserInfo[] | null
}

const initialState: FriendsState = {
    friendsList: null
}

export const getFriendsList = createAsyncThunk(
    'friends/getFriendsList',
    async () => {
        return await api.getOwnSubscriptions()
    }
)

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        
    },
    extraReducers(builder) {
        builder
            .addCase(getFriendsList.fulfilled, (state, action) => {
                state.friendsList = action.payload
            })
            .addCase(subscribe.fulfilled, (state) => {
                state.friendsList = null
            })
            .addCase(unsubscribe.fulfilled, (state) => {
                state.friendsList = null
            })
    },
})

export const selectFriendsList = (state: RootState) => state.friends.friendsList

export default friendsSlice.reducer
