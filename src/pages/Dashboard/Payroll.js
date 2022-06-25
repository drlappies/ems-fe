import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { networkStatus } from '../../constants/network';
import Table from '../../components/Table/Table';
import useTable from '../../components/Table/useTable';
import { getUserPayroll } from '../../redux/thunks/user';

const columns = [
    { id: 'id', label: 'ID' },
    { id: 'date_from', label: 'Date From' },
    { id: 'date_to', label: 'Date To' },
    { id: 'amount', label: 'Amount' },
    { id: 'payday', label: 'Payday' },
    { id: 'status', label: 'Status' },
]

function DashboardPayrollTab() {
    const dispatch = useDispatch();
    const payrollList = useSelector(state => state.user.payrollList);
    const payrollListCount = useSelector(state => state.user.payrollListCount)
    const payrollListStatus = useSelector(state => state.user.payrollListStatus);
    const [orderBy, order, selected, page, rowsPerPage, handleRequestSort, handleSelectAllClick, handleClick, handleChangePage, handleChangeRowsPerPage] = useTable(payrollList);

    useEffect(() => {
        dispatch(getUserPayroll(page * rowsPerPage, rowsPerPage, order, orderBy));
    }, [dispatch, order, orderBy, page, rowsPerPage])

    return (
        <>
            <Table
                loading={payrollListStatus === networkStatus.FETCH_IN_PROGRESS}
                error={payrollListStatus === networkStatus.FETCH_FAILED}
                orderBy={orderBy}
                order={order}
                selected={selected}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 25, 100]}
                onSelectAll={handleSelectAllClick}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                onRequestSort={handleRequestSort}
                columns={columns}
                rows={payrollList}
                count={payrollListCount}
                onSelectAllClick={handleSelectAllClick}
                onSelect={handleClick}
            />
        </>
    )
}

export default DashboardPayrollTab