import { connect, ConnectedProps } from "react-redux"
import LoginBlock from "../components/blocks/login/LoginBlock"
import UserPageBlock from "../components/blocks/user-page/UserPageBlock"
import { RootState } from "../store"
import { selectTokenData } from "../store/user/user"

const HomeView: React.FC<Props> = ({ tokenData }) => {
    const authorized = !!tokenData
    if (authorized) {
        return (
            <UserPageBlock />
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

export default connector(HomeView)
