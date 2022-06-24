import { Outlet } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Navbar from '../../components/Navbar/Navbar';

function MainPage() {
    return (
        <Stack direction={"row"}>
            <Navbar />
            <Outlet />
        </Stack>
    )
}

export default MainPage