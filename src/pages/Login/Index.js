import Stack from '@mui/material/Stack';
import LoginForm from '../../features/LoginForm/LoginForm'

function LoginPage() {
    return (
        <Stack component="div" width="100vw" height="100vh" justifyContent="center" alignItems="center">
            <LoginForm />
        </Stack>
    )
}

export default LoginPage