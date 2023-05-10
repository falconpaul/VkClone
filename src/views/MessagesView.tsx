import { connect, ConnectedProps } from "react-redux"
import LoginBlock from "../components/blocks/login/LoginBlock"
import MessagesPageBlock from "../components/blocks/messages-page/MessagesPageBlock"
import { RootState } from "../store"
import { selectTokenData } from "../store/user/user"

const MessagesView: React.FC<Props> = ({ tokenData }) => {
    const authorized = !!tokenData
    if (authorized) {
        return (
            <MessagesPageBlock />
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

export default connector(MessagesView)
