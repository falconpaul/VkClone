import { connect, ConnectedProps } from "react-redux"
import { Outlet } from "react-router"
import { RootState } from "../../store"
import { selectLayout } from "../../store/layout/layout"
import { selectTokenData } from "../../store/user/user"
import MainLayout from "./main/MainLayout"
import SimpleLayout from "./simple/SimpleLayout"

const DynamicLayout: React.FC<Props> = ({ layout, tokenData }) => {
    if (!layout) {
        layout = !!tokenData ? 'main' : 'simple'
    }
    if (layout === 'main') {
        return <MainLayout />
    }
    else if (layout === 'simple') {
        return <SimpleLayout />
    }
    return <Outlet />
}

const mapState = (state: RootState) => {
    return {
        layout: selectLayout(state),
        tokenData: selectTokenData(state)
    }
}

const connector = connect(mapState, null)

type Props = ConnectedProps<typeof connector>

export default connector(DynamicLayout)
