import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { api } from "../../api/api";
import router from "../../router";
import { sendLoginForm } from "../loginForm/loginForm";

type TokenData = {
  id: number;
  login: string;
  expires: number;
};

export type UserInfo = {
  id: number,
  name: string,
  surname: string,
  patronymic: string,
  bdate: string,
  city: string,
  university: string,
  avatar: string | null,
  isSubscription: 0 | 1
}

export interface UserState {
  tokenData: TokenData | null;
  userInfo: UserInfo | null;
}

export const getSelfInfo = createAsyncThunk(
  'user/getSelfInfo',
  async () => {
    return await api.getSelfInfo()
  }
)

export const changeAvatar = createAsyncThunk(
  'user/changeAvatar',
  async (file: File) => {
    const url = await api.uploadFile(file)
    await api.changeAvatar(url)
    return url
  }
)

export const deleteAvatar = createAsyncThunk(
  'user/deleteAvatar',
  async () => {
    await api.changeAvatar(null)
  }
)

const getTokenData = () => {
  const item = localStorage.getItem("at");
  if (!item) return null;
  const [payload] = item.split(".");
  return JSON.parse(atob(payload)) as TokenData;
};

const tokenData = getTokenData()

const initialState: UserState = {
  tokenData,
  userInfo: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("at")
      state.tokenData = null
      router.navigate("/")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendLoginForm.fulfilled, (state, action) => {
        localStorage.setItem("at", action.payload);
        state.tokenData = getTokenData();
      })
      .addCase(getSelfInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload
      })
      .addCase(changeAvatar.fulfilled, (state, action) => {
        if (!state.userInfo) return
        state.userInfo.avatar = action.payload
      })
      .addCase(deleteAvatar.fulfilled, (state) => {
        if (!state.userInfo) return
        state.userInfo.avatar = null
      })
  },
})

export const selectTokenData = (state: RootState) => state.user.tokenData
export const selectUserInfo = (state: RootState) => state.user.userInfo

export const { logout } = userSlice.actions

export default userSlice.reducer
