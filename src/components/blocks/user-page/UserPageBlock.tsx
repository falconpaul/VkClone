import { Button, Box, CircularProgress, Grid, TextField, Typography, Card, CardContent } from "@mui/material"
import { useEffect } from "react"
import { connect, ConnectedProps } from "react-redux"
import { AppDispatch, RootState } from "../../../store"
import { changeAvatar, deleteAvatar, selectUserInfo } from "../../../store/user/user"
import { changeNewPostText, getOwnPosts, selectOwnPosts, selectNewPost, sendNewPost, changeNewPostPhoto, deleteNewPostPhoto, deletePost } from "../../../store/posts/posts"
import CustomFileInput from "../../atoms/custom-file-input/CustomFileInput"
import PostCard from "../post-card/PostCard"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAgeString } from "../../../utils/date-utils"

const UserPageBlock: React.FC<Props> = ({
    userInfo,
    ownPosts,
    newPost,
    getOwnPosts,
    changeNewPostText,
    changeNewPostPhoto,
    deleteNewPostPhoto,
    sendNewPost,
    changeAvatar,
    deleteAvatar,
    deletePost
}) => {
    useEffect(() => {
        if (!ownPosts) {
            getOwnPosts()
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
                <Box>
                    <CustomFileInput onChange={changeAvatar}>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ marginTop: '10px' }}
                        >
                            Загрузить аватар
                        </Button>
                    </CustomFileInput>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        sx={{ marginTop: '10px' }}
                        onClick={deleteAvatar}
                    >
                        Удалить аватар
                    </Button>
                </Box>
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
        <Box mt={2}>
            <Box my={2}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Добавить пост</Typography>
                        <Box display="flex" alignItems="flex-start">
                            <TextField
                                multiline
                                fullWidth
                                size="small"
                                value={newPost.text}
                                onChange={(e) => changeNewPostText(e.currentTarget.value)}
                            />
                            <Button
                                variant="contained"
                                sx={{ marginLeft: '15px' }}
                                onClick={sendNewPost}
                            >
                                Отправить
                            </Button>
                            <CustomFileInput onChange={changeNewPostPhoto}>
                                <Button
                                    sx={{ marginLeft: '15px' }}
                                    onClick={sendNewPost}
                                >
                                    <AttachFileIcon />
                                </Button>
                            </CustomFileInput>
                        </Box>
                        {newPost.photo && (
                            <Box display="flex" mt={2}>
                                <Box>
                                    <img
                                        src={newPost.photo}
                                        alt=""
                                        style={{ maxHeight: 100, maxWidth: '100%' }}
                                    />
                                </Box>
                                <Box>
                                    <DeleteIcon
                                        sx={{ cursor: 'pointer' }}
                                        onClick={deleteNewPostPhoto}
                                    />
                                </Box>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Box>
            <Typography variant="h5">Мои посты:</Typography>
            {!ownPosts && <CircularProgress />}
            {ownPosts && ownPosts.length === 0 && (
                <Typography>
                    Вы ещё не написали ни одного поста
                </Typography>
            )}
            {ownPosts && ownPosts.map((p) => (
                <PostCard key={p.id} post={p} user={userInfo} onDelete={deletePost} />
            ))}
        </Box>
    </>
}

const mapState = (state: RootState) => {
    return {
        userInfo: selectUserInfo(state),
        ownPosts: selectOwnPosts(state),
        newPost: selectNewPost(state)
    }
}

const mapDispatch = (dispatch: AppDispatch) => {
    return {
        getOwnPosts: () => dispatch(getOwnPosts()),
        changeNewPostText: (text: string) => dispatch(changeNewPostText(text)),
        changeNewPostPhoto: (file: File) => dispatch(changeNewPostPhoto(file)),
        deleteNewPostPhoto: () => dispatch(deleteNewPostPhoto()),
        sendNewPost: () => dispatch(sendNewPost()),
        changeAvatar: (file: File) => dispatch(changeAvatar(file)),
        deleteAvatar: () => dispatch(deleteAvatar()),
        deletePost: (id: number) => dispatch(deletePost(id))
    }
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

export default connector(UserPageBlock)
