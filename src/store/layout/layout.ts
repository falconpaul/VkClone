import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

type LayoutName = 'simple' | 'main' | null

const initialState = {
    layout: null as LayoutName
}

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        changeLayout: (state, action: PayloadAction<LayoutName>) => {
            state.layout = action.payload
        }
    }
})

export const selectLayout = (state: RootState) => state.layout.layout

export default layoutSlice.reducer
