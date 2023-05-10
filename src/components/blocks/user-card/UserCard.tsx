import { Box, Button, Card, CardHeader } from "@mui/material";
import { connect, ConnectedProps } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch, RootState } from "../../../store";
import { subscribe, unsubscribe } from "../../../store/profile/profile";
import { selectTokenData, UserInfo } from "../../../store/user/user";
import SmallAvatarAtom from "../../atoms/avatar/SmallAvatarAtom";

const UserCard: React.FC<Props> = ({ tokenData, user, subscribe, unsubscribe }) => {
    const navigate = useNavigate()
    return (
        <Card variant="outlined">
            <CardHeader
                avatar={
                    <Box
                        display="inline-block"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/profile/${user.id}`)}
                    >
                        <SmallAvatarAtom src={user.avatar} />
                    </Box>
                }
                action={
                    <>
                        {tokenData?.id !== user.id && (
                            <>
                                {!user.isSubscription && (
                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{ marginLeft: '15px' }}
                                        onClick={() => subscribe(user.id)}
                                    >
                                        Добавить в друзья
                                    </Button>
                                )}
                                {!!user.isSubscription && (
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="error"
                                        sx={{ marginLeft: '15px' }}
                                        onClick={() => unsubscribe(user.id)}
                                    >
                                        Убрать из друзей
                                    </Button>
                                )}
                            </>
                        )}
                    </>
                }
                title={
                    <Box
                        display="inline-block"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/profile/${user.id}`)}
                    >
                        {user.name} {user.surname}
                    </Box>
                }
                subheader={user.city}
            />
        </Card>
    )
}

const mapState = (state: RootState) => {
    return {
        tokenData: selectTokenData(state)
    }
}

const mapDispatch = (dispatch: AppDispatch) => {
    return {
        subscribe: (id: number) => dispatch(subscribe(id)),
        unsubscribe: (id: number) => dispatch(unsubscribe(id)),
    }
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector> & { user: UserInfo }

export default connector(UserCard)
