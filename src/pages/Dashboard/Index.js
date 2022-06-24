import Header from '../../components/Header/Header';
import TabList from '../../components/Tab/TabList';
import DashboardAttendanceTab from './Attendance';
import DashboardEmployeeTab from './Employee';
import DashboardLeaveTab from './Leave';
import DashboardPayrollTab from './Payroll';

const tabList = [
    { label: "Employee", component: <DashboardEmployeeTab /> },
    { label: "Attendance", component: <DashboardAttendanceTab /> },
    { label: "Leave", component: <DashboardLeaveTab /> },
    { label: "Payroll", component: <DashboardPayrollTab /> }
]

function DashboardPage() {
    return (
        <div className="page">
            <Header text={"Dashboard"} />
            <TabList tabList={tabList} />
        </div>
    )
}

export default DashboardPage