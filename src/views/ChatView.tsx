import { connect, ConnectedProps } from "react-redux"
import ChatPageBlock from "../components/blocks/chat-page/ChatPageBlock"
import LoginBlock from "../components/blocks/login/LoginBlock"
import { RootState } from "../store"
import { selectTokenData } from "../store/user/user"

const ChatView: React.FC<Props> = ({ tokenData }) => {
    const authorized = !!tokenData
    if (authorized) {
        return (
            <ChatPageBlock />
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

export default connector(ChatView)
