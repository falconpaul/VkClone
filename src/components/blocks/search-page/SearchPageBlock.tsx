import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material"
import { connect, ConnectedProps } from "react-redux"
import { AppDispatch, RootState } from "../../../store"
import { changeQuery, selectLoadedQuery, selectQuery, selectSearchIsLoading, selectSearchResults, updateResults } from "../../../store/search/search"
import UserCard from "../user-card/UserCard"

const SearchPageBlock: React.FC<Props> = ({
    query,
    loadedQuery,
    searchResults,
    isLoading,
    changeQuery,
    updateResults
}) => {
    return <>
        <Typography variant="h5">
            Поиск людей
        </Typography>
        <Box my={2} display="flex" alignItems="flex-start">
            <TextField
                label="Имя"
                fullWidth
                size="small"
                value={query}
                onChange={(e) => changeQuery(e.currentTarget.value)}
            />
            <Button
                variant="contained"
                sx={{ marginLeft: '15px' }}
                onClick={updateResults}
            >
                Искать
            </Button>
        </Box>
        {isLoading && (
            <CircularProgress />
        )}
        {!isLoading && loadedQuery && (
            <Typography mb={2}>Показаны результаты поиска по запросу "{loadedQuery}"</Typography>
        )}
        {searchResults && searchResults.map(item => (
            <UserCard key={item.id} user={item} />
        ))}
    </>
}

const mapState = (state: RootState) => {
    return {
        query: selectQuery(state),
        loadedQuery: selectLoadedQuery(state),
        searchResults: selectSearchResults(state),
        isLoading: selectSearchIsLoading(state)
    }
}

const mapDispatch = (dispatch: AppDispatch) => {
    return {
        changeQuery: (query: string) => dispatch(changeQuery(query)),
        updateResults: () => dispatch(updateResults())
    }
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

export default connector(SearchPageBlock)
