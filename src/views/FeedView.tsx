import { connect, ConnectedProps } from "react-redux"
import FeedPageBlock from "../components/blocks/feed-page/FeedPageBlock"
import LoginBlock from "../components/blocks/login/LoginBlock"
import { RootState } from "../store"
import { selectTokenData } from "../store/user/user"

const FeedView: React.FC<Props> = ({ tokenData }) => {
    const authorized = !!tokenData
    if (authorized) {
        return (
            <FeedPageBlock />
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

export default connector(FeedView)
