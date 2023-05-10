import { Alert, Box, Button, TextField } from "@mui/material"
import { connect, ConnectedProps } from "react-redux"
import { Link } from "react-router-dom"
import { AppDispatch, RootState } from "../../../store"
import { FieldName, selectLoginState, selectLoginHasError, sendLoginForm, setLoginForm, selectErrorMessage } from "../../../store/loginForm/loginForm"

const LoginBlock: React.FC<Props> = ({
    loginForm,
    hasError,
    errorMessage,
    sendLoginForm,
    setLoginForm
}) => {
    return <>
        {hasError && (
            <Alert severity="error">
                {errorMessage}
            </Alert>
        )}
        <Box display="flex" justifyContent="center">
            <Box>
                <h2>Вход</h2>
                <Box>
                    <TextField
                        label="Логин"
                        size="small"
                        value={loginForm.login}
                        onChange={(e) => setLoginForm('login', e.currentTarget.value)}
                    />
                </Box>
                <Box marginTop={2}>
                    <TextField
                        label="Пароль"
                        InputProps={{ type: 'password' }}
                        size="small"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm('password', e.currentTarget.value)}
                    />
                </Box>
                <Box
                    marginTop={2}
                    display="flex"
                    justifyContent="space-between"
                >
                    <Button
                        variant="contained"
                        onClick={sendLoginForm}
                    >
                        Вход
                    </Button>
                    <Button component={Link} variant="outlined" to="/reg">
                        Регистрация
                    </Button>
                </Box>
            </Box>
        </Box>
    </>
}

const mapState = (state: RootState) => {
    return {
        loginForm: selectLoginState(state),
        hasError: selectLoginHasError(state),
        errorMessage: selectErrorMessage(state)
    }
}

const mapDispatch = (dispatch: AppDispatch) => {
    return {
        setLoginForm: (field: FieldName, value: string) => dispatch(setLoginForm({ field, value })),
        sendLoginForm: () => dispatch(sendLoginForm())
    }
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

export default connector(LoginBlock)

