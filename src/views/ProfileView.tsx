import { connect, ConnectedProps } from "react-redux"
import LoginBlock from "../components/blocks/login/LoginBlock"
import ProfilePageBlock from "../components/blocks/profile-page/ProfilePageBlock"
import { RootState } from "../store"
import { selectTokenData } from "../store/user/user"

const ProfileView: React.FC<Props> = ({ tokenData }) => {
    const authorized = !!tokenData
    if (authorized) {
        return (
            <ProfilePageBlock />
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

export default connector(ProfileView)
