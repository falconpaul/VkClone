import { connect, ConnectedProps } from "react-redux"
import FriendsPageBlock from "../components/blocks/friends-page/FriendsPageBlock"
import LoginBlock from "../components/blocks/login/LoginBlock"
import { RootState } from "../store"
import { selectTokenData } from "../store/user/user"

const FriendsView: React.FC<Props> = ({ tokenData }) => {
    const authorized = !!tokenData
    if (authorized) {
        return (
            <FriendsPageBlock />
        )
    } else {
        return <>
            <LoginBlock />
        </>
    }
}

const mapState = (state: RootState) => {
    return {
        tokenData: selectTokenData(state)
    }
}

const connector = connect(mapState, null)

type Props = ConnectedProps<typeof connector>

export default connector(FriendsView)
