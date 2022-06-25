import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/Main/Index';
import LoginPage from './pages/Login/Index';
import DashboardPage from './pages/Dashboard/Index';
import AttendancePage from './pages/Attendance/Index';
import AttendanceCheckInPage from './pages/Attendance/CheckIn';
import EmployeePage from './pages/Employee/Index';
import LeavePage from './pages/Leave/Index';
import PayrollPage from './pages/Payroll/Index';
import LeaveApplicationPage from './pages/Leave/Apply';
import { getUser } from './redux/thunks/user';

function Router() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/" element={<MainPage />}>
                <Route exact path="dashboard" element={<DashboardPage />} />
                <Route exact path="attendance" element={<AttendancePage />} />
                <Route exact path="attendance/check_in" element={<AttendanceCheckInPage />} />
                <Route exact path="employee" element={<EmployeePage />} />
                <Route exact path="leave" element={<LeavePage />} />
                <Route exact path="leave/apply" element={<LeaveApplicationPage />} />
                <Route exact path="payroll" element={<PayrollPage />} />
            </Route>
        </Routes>
    )
}

export default Router