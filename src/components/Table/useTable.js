import { useState, useCallback } from 'react';

function useTable(rows) {
    const [orderBy, setOrderBy] = useState('id')
    const [order, setOrder] = useState('asc')
    const [selected, setSelected] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleRequestSort = useCallback((id) => {
        const isAsc = orderBy === id && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
        setSelected([]);
    }, [order, orderBy])

    const handleSelectAllClick = useCallback((event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((row) => row.id.toString());
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }, [rows])

    const handleClick = useCallback((event) => {
        if (event.target.checked) {
            setSelected([...selected, event.target.name]);
        } else {
            setSelected(selected.filter(item => item !== event.target.name));
        }
    }, [selected])

    const handleChangePage = (_event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    return [orderBy, order, selected, page, rowsPerPage, handleRequestSort, handleSelectAllClick, handleClick, handleChangePage, handleChangeRowsPerPage]
}

export default useTable