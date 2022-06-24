import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';


export const NavTabs = styled(TabList)({
    '& .MuiTabs-indicator': {
        backgroundColor: "rgba(135, 123, 255, 0.8)",
    },
})

export const NavTab = styled(Tab)({
    '&.Mui-selected': {
        color: 'rgba(135, 123, 255, 1)',
    },
})