import { useState } from 'react'
import { NavTabs, NavTab } from './Tabs';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

function Tabs(props) {
    const { tabList } = props;

    const [tab, setTab] = useState("0")

    const handleChange = (_event, newValue) => {
        setTab(newValue);
    };

    return (
        <TabContext value={tab}>
            <NavTabs onChange={handleChange}>
                {tabList.map(({ label }, index) => <NavTab key={index} label={label} value={index.toString()} disableRipple />)}
            </NavTabs>

            {tabList.map(({ component }, index) => <TabPanel key={index} value={index.toString()}>{component}</TabPanel>)}
        </TabContext>
    )
}

Tabs.defaultProps = {
    tabList: [],
}

export default Tabs;