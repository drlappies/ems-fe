import Header from '../../components/Header/Header';
import TabList from '../../components/Tab/TabList';
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
            <TabList tabList={tabList} />
        </>
    )
}

export default DashboardPage