import { Button, Box, CircularProgress, Grid, Typography } from "@mui/material"
import { useEffect } from "react"
import { connect, ConnectedProps } from "react-redux"
import { AppDispatch, RootState } from "../../../store"
import { loadUserData, selectUserInfo, selectUserPosts, subscribe, unsubscribe } from "../../../store/profile/profile";
import { useNavigate, useParams } from "react-router";
import PostCard from "../post-card/PostCard";
import { getAgeString } from "../../../utils/date-utils";

const ProfilePageBlock: React.FC<Props> = ({
    userInfo,
    userPosts,
    loadUserData,
    subscribe,
    unsubscribe
}) => {
    const navigate = useNavigate()
    const id = +(useParams().id as string)
    useEffect(() => {
        if (!userInfo || userInfo.id !== id) {
            loadUserData(id)
        }
    }, [])
    if (!userInfo) {
        return <CircularProgress />
    }
    return <>
        <Grid container>
            <Grid item xs={12} md={4} lg={3}>
                {userInfo.avatar && (
                    <img src={userInfo.avatar} style={{ maxWidth: '100%' }} alt="" />
                )}
                {!userInfo.avatar && (
                    <Box sx={{
                        background: 'grey',
                        height: '300px'
                    }} />
                )}
                
                <Button
                    variant="contained"
                    fullWidth
                    sx={{ marginTop: '15px' }}
                    onClick={() => navigate(`/chat/${userInfo.id}`)}
                >
                    Написать сообщение
                </Button>
                {!userInfo.isSubscription && (
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ marginTop: '15px' }}
                        onClick={() => subscribe(id)}
                    >
                        Добавить в друзья
                    </Button>
                )}
                {userInfo.isSubscription && (
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        sx={{ marginTop: '15px' }}
                        onClick={() => unsubscribe(id)}
                    >
                        Убрать из друзей
                    </Button>
                )}
            </Grid>
            <Grid item xs={12} md={8} lg={9} padding="0 15px 15px">
                <Typography fontWeight="bold" variant="h4">
                    {userInfo.name} {userInfo.surname} {userInfo.patronymic}
                </Typography>
                <div>Дата рождения: {userInfo.bdate} ({getAgeString(userInfo.bdate)})</div>
                <div>Город: {userInfo.city}</div>
                <div>ВУЗ: {userInfo.university}</div>
            </Grid>
        </Grid>
        <Typography variant="h5" mt={2}>Посты пользователя:</Typography>
        <Box mt={2}>
            {userPosts && userPosts.length === 0 && (
                <Typography>
                    Пользователь ещё не написал ни одного поста
                </Typography>
            )}
            {userPosts && userPosts.map((p) => (
                <PostCard key={p.id} post={p} user={userInfo} />
            ))}
        </Box>
    </>
}

const mapState = (state: RootState) => {
    return {
        userInfo: selectUserInfo(state),
        userPosts: selectUserPosts(state)
    }
}

const mapDispatch = (dispatch: AppDispatch) => {
    return {
        loadUserData: (id: number) => dispatch(loadUserData(id)),
        subscribe: (id: number) => dispatch(subscribe(id)),
        unsubscribe: (id: number) => dispatch(unsubscribe(id)),
    }
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

export default connector(ProfilePageBlock)
