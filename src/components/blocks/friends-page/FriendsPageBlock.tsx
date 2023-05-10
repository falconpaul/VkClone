import { CircularProgress, Typography } from "@mui/material"
import { useEffect } from "react"
import { connect, ConnectedProps } from "react-redux"
import { AppDispatch, RootState } from "../../../store"
import { getFriendsList, selectFriendsList } from "../../../store/friends/friends"
import UserCard from "../user-card/UserCard"

const FriendsPageBlock: React.FC<Props> = ({
    friendsList,
    getFriendsList
}) => {
    useEffect(() => {
        if (!friendsList) {
            getFriendsList()
        }
    }, [friendsList])
    return <>
        <Typography variant="h5">Мои друзья</Typography>
        {!friendsList && (
            <CircularProgress />
        )}
        {friendsList && friendsList.length === 0 && (
            <Typography variant="body2" mt={2}>Здесь будут мои друзья</Typography>
        )}
        {friendsList && friendsList.map(item => (
            <UserCard key={item.id} user={item} />
        ))}
    </>
}

const mapState = (state: RootState) => {
    return {
        friendsList: selectFriendsList(state)
    }
}

const mapDispatch = (dispatch: AppDispatch) => {
    return {
        getFriendsList: () => dispatch(getFriendsList())
    }
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

export default connector(FriendsPageBlock)
