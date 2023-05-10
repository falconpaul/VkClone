import { connect, ConnectedProps } from "react-redux"
import LoginBlock from "../components/blocks/login/LoginBlock"
import SearchPageBlock from "../components/blocks/search-page/SearchPageBlock"
import { RootState } from "../store"
import { selectTokenData } from "../store/user/user"

const SearchView: React.FC<Props> = ({ tokenData }) => {
    const authorized = !!tokenData
    if (authorized) {
        return (
            <SearchPageBlock />
        )
    } else {
        return <>
            <LoginBlock />
        </>
    }
}

const mapState = (state: RootState) => {
    return {
        tokenData: selectTokenData(state),
        
    }
}

const connector = connect(mapState, null)

type Props = ConnectedProps<typeof connector>

export default connector(SearchView)
