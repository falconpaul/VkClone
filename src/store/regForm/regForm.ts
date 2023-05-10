import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."
import { api } from "../../api/api"

export interface RegState {
    status: 'success' | 'failed' | null,
    errorMessage: string,
    formData: {
        name: string
        surname: string
        patronymic: string
        bdate: string
        city: string
        university: string
        login: string
        password: string
        repPassword: string
    }
}

export type FieldName = keyof RegState['formData']

const initialState: RegState = {
    status: null,
    errorMessage: '',
    formData: {
        name: '',
        surname: '',
        patronymic: '',
        bdate: '',
        city: '',
        university: '',
        login: '',
        password: '',
        repPassword: ''
    }
}

export const sendRegForm = createAsyncThunk(
    'reg/sendRegForm',
    async (payload: undefined, { getState }) => {
        const state = getState() as RootState
        const { password, repPassword } = state.regForm.formData
        if (password !== repPassword) {
            throw new Error('Пароли не совпадают')
        }
        const regData = { ...state.regForm.formData, repPassword: undefined }
        delete regData.repPassword
        return await api.reg(regData)
    }
)

const regSlice = createSlice ({
    name: 'reg',
    initialState,
    reducers: {
        setRegForm: (state, action: PayloadAction<{ field: FieldName, value: string }>) => {
            state.formData[action.payload.field] = action.payload.value
        },
        setStatus: (state) => {
            state.status = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(sendRegForm.fulfilled, (state) => {
            for (const k in state.formData) {
                state.formData[k as FieldName] = ''
            }
            state.status = 'success'
            state.errorMessage = ''
        }).addCase(sendRegForm.rejected, (state, action) => {
            state.status = 'failed'
            state.errorMessage = action.error.message || 'Ошибка'
        })
    }
})

export const selectRegState = (state: RootState) => state.regForm.formData

export const selectRegStatus = (state: RootState) => state.regForm.status

export const selectErrorMessage = (state: RootState) => state.regForm.errorMessage

export const { setRegForm, setStatus } = regSlice.actions

export default regSlice.reducer
