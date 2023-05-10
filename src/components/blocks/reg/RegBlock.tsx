import { connect, ConnectedProps } from "react-redux"
import { FieldName, selectErrorMessage, selectRegState, selectRegStatus, sendRegForm, setRegForm } from "../../../store/regForm/regForm"
import { AppDispatch, RootState } from "../../../store"
import { selectTokenData } from "../../../store/user/user"
import { Alert, Box, Button, TextField } from "@mui/material"
import { Link } from "react-router-dom"

const RegBlock: React.FC<Props> = ({
  regForm,
  status,
  errorMessage,
  sendRegForm,
  setRegForm
}) => {
  return <>
    {status === 'failed' && (
      <Alert severity="error">
        {errorMessage}
      </Alert>
    )}
    {status === 'success' && (
      <Alert severity="success">
        Спасибо за регистрацию! Теперь вы можете <Link to="/">войти</Link> в систему!
      </Alert>
    )}
    <Box display="flex" justifyContent="center">
      <Box>
        <h2>Регистрация</h2>
        <Box marginTop={2}>
          <TextField
            label="Имя*"
            size="small"
            value={regForm.name}
            onChange={(e) => setRegForm('name', e.currentTarget.value)}
          />
        </Box>
        <Box marginTop={2}>
          <TextField
            label="Фамилия*"
            size="small"
            value={regForm.surname}
            onChange={(e) => setRegForm('surname', e.currentTarget.value)}
          />
        </Box>
        <Box marginTop={2}>
          <TextField
            label="Отчество"
            size="small"
            value={regForm.patronymic}
            onChange={(e) => setRegForm('patronymic', e.currentTarget.value)}
          />
        </Box>
        <Box marginTop={2}>
          <TextField
            label="Дата рождения* (ДД.ММ.ГГГГ)"
            size="small"
            value={regForm.bdate}
            onChange={(e) => setRegForm('bdate', e.currentTarget.value)}
          />
        </Box>
        <Box marginTop={2}>
          <TextField
            label="Город"
            size="small"
            value={regForm.city}
            onChange={(e) => setRegForm('city', e.currentTarget.value)}
          />
        </Box>
        <Box marginTop={2}>
          <TextField
            label="ВУЗ"
            size="small"
            value={regForm.university}
            onChange={(e) => setRegForm('university', e.currentTarget.value)}
          />
        </Box>
        <Box marginTop={2}>
          <TextField
            label="Логин*"
            size="small"
            value={regForm.login}
            onChange={(e) => setRegForm('login', e.currentTarget.value)}
          />
        </Box>
        <Box marginTop={2}>
          <TextField
            label="Пароль*"
            InputProps={{ type: 'password' }}
            size="small"
            value={regForm.password}
            onChange={(e) => setRegForm('password', e.currentTarget.value)}
          />
        </Box>
        <Box marginTop={2}>
          <TextField
            label="Повтор пароля*"
            InputProps={{ type: 'password' }}
            size="small"
            value={regForm.repPassword}
            onChange={(e) => setRegForm('repPassword', e.currentTarget.value)}
          />
        </Box>
        <Box
          marginTop={2}
          display="flex"
          justifyContent="space-between"
        >
          <Button
            variant="contained"
            onClick={sendRegForm}
          >
            Зарегистрироваться
          </Button>
        </Box>
      </Box>
    </Box>
  </>
}

const mapState = (state: RootState) => {
  return {
    regForm: selectRegState(state),
    status: selectRegStatus(state),
    errorMessage: selectErrorMessage(state),
    tokenData: selectTokenData(state)
  }
}

const mapDispatch = (dispatch: AppDispatch) => {
  return {
    setRegForm: (field: FieldName, value: string) => dispatch(setRegForm({ field, value })),
    sendRegForm: () => dispatch(sendRegForm())
  }
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

export default connector(RegBlock)

