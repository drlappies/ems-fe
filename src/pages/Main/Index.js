import { Outlet } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Navbar from '../../features/Navbar/Navbar';

function MainPage() {
    return (
        <Stack direction={"row"}>
            <Navbar />
            <div className="page">
                <Outlet />
            </div>
        </Stack>
    )
}

export default MainPage