import { Box, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch } from "../../../store";
import { addLike, OwnPost, removeLike } from "../../../store/posts/posts";
import { UserInfo } from "../../../store/user/user";
import SmallAvatarAtom from "../../atoms/avatar/SmallAvatarAtom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

const PostCard: React.FC<Props> = ({ post, user, addLike, removeLike, onDelete }) => {
    return (
        <Card
            variant="outlined"
            sx={{ maxWidth: '50%', marginTop: '10px' }}
        >
            <CardHeader
                avatar={<SmallAvatarAtom src={user.avatar} />}
                action={<>
                    {onDelete && (
                        <DeleteIcon
                            sx={{ cursor: 'pointer' }}
                            onClick={() => onDelete(post.id)}
                        />
                    )}
                </>}
                title={`${user.name} ${user.surname}`}
                subheader={post.created}
            />
            {post.photo && (
                <CardMedia
                    component="img"
                    image={post.photo}
                    alt=""
                />
            )}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {post.text}
                </Typography>
            </CardContent>

            <Box display="flex" justifyContent="flex-end" py={1} px={2}>
                <Box display="flex" alignItems="center">
                    {!post.hasLike && <FavoriteBorderIcon onClick={() => addLike(post.id)} />}
                    {!!post.hasLike && <FavoriteIcon htmlColor="red" onClick={() => removeLike(post.id)} />}
                    <Typography
                        variant="body2"
                        component="span"
                        color="text.secondary"
                        ml={1}
                    >
                        {post.likes}
                    </Typography>
                </Box>
            </Box>
        </Card>
    )
}

const mapDispatch = (dispatch: AppDispatch) => {
    return {
        addLike: (id: number) => dispatch(addLike(id)),
        removeLike: (id: number) => dispatch(removeLike(id)),
    }
}

const connector = connect(null, mapDispatch)

type Props = ConnectedProps<typeof connector>
    & {
        post: OwnPost,
        user: UserInfo,
        onDelete?: (id: number) => void
    }

export default connector(PostCard)
