import { Button, CssBaseline, Grid, Box, Container } from "@mui/material"
import { useEffect } from "react"
import { connect, ConnectedProps } from "react-redux"
import { Outlet } from "react-router"
import { NavLink } from "react-router-dom"
import { AppDispatch, RootState } from "../../../store"
import { getSelfInfo, logout, selectUserInfo } from "../../../store/user/user"
import SmallAvatarAtom from "../../atoms/avatar/SmallAvatarAtom"

const MainLayout: React.FC<Props> = ({ userInfo, getSelfInfo, logout }) => {
    useEffect(() => {
        if (!userInfo) {
            getSelfInfo()
        }
    }, [])
    return <>
        <CssBaseline />
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Box
                py={1}
                bgcolor="#4b75a5"
                color="white"
            >
                <Container maxWidth="lg">
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Box sx={{ userSelect: 'none' }}>Моя соц. сеть</Box>
                        <Box>
                            {userInfo && (
                                <Box display="flex" alignItems="center">
                                    <Box><SmallAvatarAtom src={userInfo.avatar} /></Box>
                                    <Box ml={2}>{userInfo.name} {userInfo.surname}</Box>
                                    <Box ml={2} onClick={logout} sx={{ cursor: 'pointer' }}>(выйти)</Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Container
                maxWidth="lg"
                sx={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Grid container flex="1">
                    <Grid item xs={3}>
                        <Box py={2}>
                            <Button
                                variant="outlined"
                                fullWidth
                                component={NavLink}
                                to="/"
                            >
                                Моя страница
                            </Button>
                            <Button
                                variant="outlined"
                                fullWidth
                                component={NavLink}
                                to="/friends"
                                sx={{ marginTop: '10px' }}
                            >
                                Друзья
                            </Button>
                            <Button
                                variant="outlined"
                                fullWidth
                                component={NavLink}
                                to="/messages"
                                sx={{ marginTop: '10px' }}
                            >
                                Сообщения
                            </Button>
                            <Button
                                variant="outlined"
                                fullWidth
                                component={NavLink}
                                to="/feed"
                                sx={{ marginTop: '10px' }}
                            >
                                Лента
                            </Button>
                            <Button
                                variant="outlined"
                                fullWidth
                                component={NavLink}
                                to="/search"
                                sx={{ marginTop: '10px' }}
                            >
                                Поиск людей
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={9} display="flex" flexDirection="column">
                        <Box p={2} flex="1">
                            <Outlet />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </>
}

const mapState = (state: RootState) => {
    return {
        userInfo: selectUserInfo(state),
    }
}

const mapDispatch = (dispatch: AppDispatch) => {
    return {
        getSelfInfo: () => dispatch(getSelfInfo()),
        logout: () => dispatch(logout())
    }
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

export default connector(MainLayout)
