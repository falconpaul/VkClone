import { Box, Card, CardActionArea, CardContent, CircularProgress, Typography } from "@mui/material"
import { useEffect } from "react"
import { connect, ConnectedProps } from "react-redux"
import { useNavigate } from "react-router"
import { AppDispatch, RootState } from "../../../store"
import { loadAllChats, selectAllChats } from "../../../store/messages/messages"
import SmallAvatarAtom from "../../atoms/avatar/SmallAvatarAtom"

const MessagesPageBlock: React.FC<Props> = ({
    chatsList,
    loadAllChats
}) => {
    useEffect(() => {
        if (!chatsList) {
            loadAllChats()
        }
    }, [])

    const navigate = useNavigate()
    return <>
        <Typography variant="h5">Сообщения</Typography>
        {chatsList === null && (
            <CircularProgress />
        )}
        {chatsList && <>
            {chatsList.length === 0 && (
                <Typography variant="body2" mt={2}>Здесь будут отображаться Ваши сообщения</Typography>
            )}
            {chatsList.map(item => (
                <Card key={item.partner_id} variant="outlined">
                    <CardActionArea onClick={() => navigate(`/chat/${item.partner_id}`)}>
                        <CardContent>
                            <Box display="flex">
                                <Box>
                                    <SmallAvatarAtom src={item.user.avatar} />
                                </Box>
                                <Box ml={2} flex="1">
                                    <Typography variant="subtitle2">
                                        {item.user.name} {item.user.surname}
                                    </Typography>
                                    <Typography variant="body1">
                                        {item.ownMessage ? '< ' : '> '}
                                        {item.text}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </>}
    </>
}

const mapState = (state: RootState) => {
    return {
        chatsList: selectAllChats(state)
    }
}

const mapDispatch = (dispatch: AppDispatch) => {
    return {
        loadAllChats: () => dispatch(loadAllChats())
    }
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

export default connector(MessagesPageBlock)
