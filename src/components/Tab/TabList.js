import { useState } from 'react'
import { NavTabs, NavTab } from './Tabs';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

function Tabs(props) {
    const { tabList } = props;

    const [tab, setTab] = useState(0)

    const handleChange = (_event, newValue) => {
        setTab(newValue);
    };

    return (
        <TabContext value={tab}>
            <NavTabs onChange={handleChange}>
                {tabList.map(({ label }, index) => <NavTab sx={{ color: "rgba(135, 123, 255, 0.8)" }} label={label} value={index} disableRipple />)}
            </NavTabs>

            {tabList.map(({ component }, index) => <TabPanel sx={{ overflowY: "auto", maxHeight: "70vh" }} value={index}>{component}</TabPanel>)}
        </TabContext>
    )
}

Tabs.defaultProps = {
    tabList: [],
}

export default Tabs;