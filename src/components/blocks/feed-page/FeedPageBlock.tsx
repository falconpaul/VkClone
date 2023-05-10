import { Box, CircularProgress, Typography } from "@mui/material"
import { useEffect } from "react"
import { connect, ConnectedProps } from "react-redux"
import { AppDispatch, RootState } from "../../../store"
import { getSubsPostsFirst, getSubsPostsNext, selectLastPostIsLoaded, selectNextPostsPartIsLoading, selectSubsPosts } from "../../../store/posts/posts";
import PostCard from "../post-card/PostCard";

const FeedPageBlock: React.FC<Props> = ({
    feed,
    nextPostsPartIsLoading,
    lastPostIsLoaded,
    getSubsPostsFirst,
    getSubsPostsNext
}) => {
    useEffect(() => {
        if (!feed) {
            getSubsPostsFirst()
        }
    }, [])
    useEffect(() => {
        if (nextPostsPartIsLoading || lastPostIsLoaded || !feed) return
        const handleScroll = () => {
            const rest = document.body.scrollHeight - window.scrollY - window.innerHeight
            if (rest < 200) {
                getSubsPostsNext(feed[feed.length - 1].id)
            }
        }
        document.addEventListener('scroll', handleScroll)
        return () => document.removeEventListener('scroll', handleScroll)
    }, [feed, nextPostsPartIsLoading, lastPostIsLoaded])
    if (!feed) {
        return <CircularProgress />
    }
    return <>
        <Typography variant="h5">Лента</Typography>
        <Box mt={2}>
            {feed.length === 0 && (
                <Typography>
                    Здесь будут посты друзей
                </Typography>
            )}
            {feed.map((p) => (
                <PostCard key={p.id} post={p} user={p.user} />
            ))}
        </Box>
    </>
}

const mapState = (state: RootState) => {
    return {
        feed: selectSubsPosts(state),
        nextPostsPartIsLoading: selectNextPostsPartIsLoading(state),
        lastPostIsLoaded: selectLastPostIsLoaded(state),
    }
}

const mapDispatch = (dispatch: AppDispatch) => {
    return {
        getSubsPostsFirst: () => dispatch(getSubsPostsFirst()),
        getSubsPostsNext: (idFrom: number) => dispatch(getSubsPostsNext(idFrom))
    }
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

export default connector(FeedPageBlock)
