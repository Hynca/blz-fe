import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getTasksTable, useGetTaskTable } from 'store/actions/tasks.actions';
import { dispatch } from 'store/index';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import AddEditTask from './AddEditTask/AddEditTask';

const Tasks = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<number | undefined>(undefined);

    const tableData = useGetTaskTable();
    useEffect(() => {
        dispatch(getTasksTable({ page: page, size: rowsPerPage, sortBy: 'createdAt', sortOrder: 'DESC' }));
    }, [page, rowsPerPage]);

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="bg-[#FFFFFF66] shadow rounded-lg w-full h-full p-8 flex justify-center">
            <div className="w-full max-w-[1300px] h-auto">
                <TableContainer component={Paper} sx={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', borderRadius: '4px' }}>
                    <div className="p-4 shadow-none border-0 bg-white flex flex-row items-center w-full">
                        <h1 className="text-3xl text-gray-800 font-semibold">Tasks</h1>
                        <Button
                            variant="contained"
                            sx={{ ml: 'auto', bgcolor: 'black', textTransform: 'none' }}
                            onClick={() => {
                                setSelectedTaskId(undefined);
                                setIsModalOpen(true);
                            }}
                        >
                            Create new task
                        </Button>
                    </div>
                    <Table sx={{ minWidth: 650 }} size="small">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f8f8f8' }}>
                                <TableCell sx={{ fontWeight: 600, color: '#333', py: 1.5 }}>Title</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#333', py: 1.5 }} align="right">
                                    Description
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#333', py: 1.5 }} align="right">
                                    Location
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#333', py: 1.5 }} align="right">
                                    Created at
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#333', py: 1.5 }} align="right">
                                    Updated at
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#333', py: 1.5 }} align="right">
                                    End at
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#333', py: 1.5 }} align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.data?.items.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        backgroundColor: index % 2 === 0 ? 'white' : '#fafafa',
                                        '&:hover': {
                                            backgroundColor: '#f4f4f4',
                                            transition: 'background-color 0.2s'
                                        },
                                        height: '48px'
                                    }}
                                >
                                    <TableCell component="th" scope="row" sx={{ color: '#222', fontWeight: 500 }}>
                                        {row.title}
                                    </TableCell>
                                    <TableCell align="right" sx={{ color: '#444' }}>
                                        {row.description}
                                    </TableCell>
                                    <TableCell align="right" sx={{ color: '#444' }}>
                                        {row.location}
                                    </TableCell>
                                    <TableCell align="right" sx={{ color: '#444' }}>
                                        {dayjs(row.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                                    </TableCell>
                                    <TableCell align="right" sx={{ color: '#444' }}>
                                        {dayjs(row.updatedAt).format('DD-MM-YYYY HH:mm:ss')}
                                    </TableCell>
                                    <TableCell align="right" sx={{ color: '#444' }}>
                                        {dayjs(row.endAt).format('DD-MM-YYYY HH:mm:ss')}
                                    </TableCell>
                                    <TableCell align="right" sx={{ color: '#444' }}>
                                        <IconButton
                                            aria-label="edit"
                                            color="primary"
                                            onClick={() => {
                                                setSelectedTaskId(row.id);
                                                setIsModalOpen(true);
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" color="error">
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={tableData.data?.pagination.totalItems || 0}
                        rowsPerPageOptions={[1, 5, 10, 25]}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </div>
            {isModalOpen && <AddEditTask isOpen={isModalOpen} id={selectedTaskId} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default Tasks;
