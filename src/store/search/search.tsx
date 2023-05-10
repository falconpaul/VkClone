import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { api } from "../../api/api";
import { subscribe, unsubscribe } from "../profile/profile";
import { UserInfo } from "../user/user";

interface SearchState {
    query: string
    loadedQuery: string | null
    searchResults: UserInfo[] | null
    isLoading: boolean
}

const initialState: SearchState = {
    query: '',
    loadedQuery: null,
    searchResults: null,
    isLoading: false
}

export const updateResults = createAsyncThunk(
    'search/updateResults',
    async (payload, { getState }) => {
        const { query } = (getState() as RootState).search
        if (query.length === 0) {
            throw new Error('Пустая строка поиска')
        }
        return await api.searchPeople(query)
    }
)

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        changeQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(updateResults.pending, (state, action) => {
                state.searchResults = null
                state.loadedQuery = state.query
                state.isLoading = true
            })
            .addCase(updateResults.fulfilled, (state, action) => {
                state.searchResults = action.payload
                state.isLoading = false
            })
            .addCase(subscribe.fulfilled, (state, action) => {
                if (state.searchResults) {
                    const user = state.searchResults.find(f => f.id === action.payload)
                    if (user) {
                        user.isSubscription = 1
                    }
                }
            })
            .addCase(unsubscribe.fulfilled, (state, action) => {
                if (state.searchResults) {
                    const user = state.searchResults.find(f => f.id === action.payload)
                    if (user) {
                        user.isSubscription = 0
                    }
                }
            })
    },
})

export const selectQuery = (state: RootState) => state.search.query
export const selectLoadedQuery = (state: RootState) => state.search.loadedQuery
export const selectSearchResults = (state: RootState) => state.search.searchResults
export const selectSearchIsLoading = (state: RootState) => state.search.isLoading

export const { changeQuery } = searchSlice.actions

export default searchSlice.reducer
