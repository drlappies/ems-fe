import { useCallback } from 'react'
import Checkbox from '@mui/material/Checkbox';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import MUITable from '@mui/material/Table'

function Table(props) {
    const { selectable, order, orderBy, onRequestSort, columns, rows, rowsPerPageOptions, count, page, onPageChange, onRowsPerPageChange, rowsPerPage, onSelectAllClick, onSelect, selected } = props;

    const renderTableRow = useCallback(() => {
        return rows.map((row, index) => {
            return (
                <TableRow key={index}>
                    {selectable && <TableCell padding="checkbox">
                        <Checkbox
                            name={row.id.toString()}
                            onChange={onSelect}
                            checked={selected.includes(row.id.toString())}
                        />
                    </TableCell>}
                    {columns.map((column, index) => {
                        return (
                            <TableCell key={index}>
                                {row[column.id]}
                            </TableCell>
                        )
                    })}
                </TableRow>
            )
        })
    }, [columns, onSelect, rows, selectable, selected])


    const renderTableHeaderRow = useCallback(() => {
        return (
            <TableRow>
                {selectable && <TableCell padding="checkbox">
                    <Checkbox
                        checked={selected.length === rows.length && rows.length > 0}
                        onChange={onSelectAllClick}
                    />
                </TableCell>}
                {columns.map(({ id, label }) => {
                    return (
                        <TableCell key={id} sortDirection={orderBy === id ? order : false}>
                            <TableSortLabel
                                active={orderBy === id}
                                direction={orderBy === id ? order : 'asc'}
                                onClick={() => onRequestSort(id)}
                            >
                                {label}
                            </TableSortLabel>
                        </TableCell>

                    )
                })}
            </TableRow>
        )
    }, [columns, onRequestSort, onSelectAllClick, order, orderBy, rows.length, selectable, selected.length])

    return (
        <div>
            <TableContainer sx={{ maxHeight: 440, minHeight: 440 }}>
                <MUITable stickyHeader>
                    <TableHead>
                        {renderTableHeaderRow()}
                    </TableHead>
                    <TableBody>
                        {renderTableRow()}
                    </TableBody>
                </MUITable>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                rowsPerPage={rowsPerPage}
                component="div"
                count={count}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </div>
    )
}

Table.defaultProps = {
    order: 'asc',
    orderBy: 'id',
    onRequestSort: () => { },
    columns: [],
    rows: [],
}

export default Table