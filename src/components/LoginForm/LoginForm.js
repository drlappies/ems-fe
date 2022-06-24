
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hooks/useInput";
import { postLogin } from "../../redux/thunks/user";
import { networkStatus } from "../../constants/network";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';


function LoginForm() {
    const dispatch = useDispatch();
    const postLoginStatus = useSelector(state => state.user.postLoginStatus)
    const [username, handleUsernameChange] = useInput("");
    const [password, handlePasswordChange] = useInput("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postLogin(username, password));
    }

    return (
        <Stack component="form" width={"350px"} onSubmit={handleSubmit}>
            <TextField
                label="Username"
                autoComplete="none"
                value={username}
                onChange={handleUsernameChange}
                type="text"
                margin="normal"
                error={postLoginStatus === networkStatus.FETCH_FAILED}
                fullWidth
            />
            <TextField
                label="Password"
                autoComplete="none"
                value={password}
                onChange={handlePasswordChange}
                type="password"
                margin="normal"
                error={postLoginStatus === networkStatus.FETCH_FAILED}
                fullWidth
            />
            <LoadingButton
                disableRipple
                fullWidth
                variant="contained"
                type="submit"
                loading={postLoginStatus === networkStatus.FETCH_IN_PROGRESS}
            >
                Login
            </LoadingButton>
        </Stack>
    )
}

export default LoginForm