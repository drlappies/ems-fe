import Header from '../../components/Header/Header';
import TabList from '../../components/Tab/TabList';
import Profile from '../../components/Profile/Profile'
import DashboardAttendanceTab from './Attendance';
import DashboardLeaveTab from './Leave';
import DashboardPayrollTab from './Payroll';

const tabList = [
    { label: "Attendance", component: <DashboardAttendanceTab /> },
    { label: "Leave", component: <DashboardLeaveTab /> },
    { label: "Payroll", component: <DashboardPayrollTab /> }
]

function DashboardPage() {
    return (
        <>
            <Header text={"Dashboard"} />
            <Profile />
            <TabList tabList={tabList} />
        </>
    )
}

export default DashboardPage