import { configureStore } from "@reduxjs/toolkit"
import loginForm from "./loginForm/loginForm"
import profile from "./profile/profile"
import friends from "./friends/friends"
import regForm from './regForm/regForm'
import user from "./user/user"
import posts from "./posts/posts"
import layout from "./layout/layout"
import search from "./search/search"
import messages from "./messages/messages"

const store = configureStore({
    reducer: {
        regForm,
        loginForm,
        user,
        posts,
        profile,
        friends,
        layout,
        search,
        messages
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
