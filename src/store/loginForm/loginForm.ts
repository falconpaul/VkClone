import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."
import { api } from "../../api/api"
import router from "../../router"

export interface LoginState {
    hasError: boolean,
    errorMessage: string,
    formData: {
        login: string,
        password: string
    }
}

export type FieldName = keyof LoginState['formData']

const initialState: LoginState = {
    hasError: false,
    errorMessage: '',
    formData: {
        login: '',
        password: ''
    }
}

export const sendLoginForm = createAsyncThunk(
    'login/sendLoginForm',
    async (payload: undefined, { getState }) => {
        const state = getState() as RootState
        return await api.login(state.loginForm.formData)
    }
)

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoginForm: (state, action: PayloadAction<{ field: FieldName, value: string }>) => {
            state.formData[action.payload.field] = action.payload.value
        }
    },
    extraReducers: (builder) => {
        builder.addCase(sendLoginForm.fulfilled, (state) => {
            for (const k in state.formData) {
                state.formData[k as FieldName] = ''
            }
            state.errorMessage = ''
            router.navigate('/')
        }).addCase(sendLoginForm.rejected, (state, action) => {
            state.hasError = true
            state.errorMessage = action.error.message || 'Ошибка'
        })
    }
})

export const selectLoginState = (state: RootState) => state.loginForm.formData

export const selectLoginHasError = (state: RootState) => state.loginForm.hasError

export const selectErrorMessage = (state: RootState) => state.loginForm.errorMessage

export const { setLoginForm } = loginSlice.actions

export default loginSlice.reducer
