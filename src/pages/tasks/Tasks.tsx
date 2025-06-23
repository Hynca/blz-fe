import {
    Button,
    IconButton,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { deleteTask, getTasksTable, useGetTaskTable } from 'store/actions/tasks.actions';
import { dispatch } from 'store/index';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import AddEditTask from './AddEditTask/AddEditTask';
import { reloadTaskTable } from 'store/slices/tasksTableSlice';
import TaskDetail from './TaskDetail/TaskDetail';

const Tasks = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<number | undefined>(undefined);

    const tableData = useGetTaskTable();

    useEffect(() => {
        dispatch(getTasksTable({ page: page, size: rowsPerPage, sortBy: 'createdAt', sortOrder: 'DESC' }));
    }, [page, rowsPerPage, tableData.tableReload]);

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDeleteTask = async (id: number) => {
        await dispatch(deleteTask(id));
        dispatch(reloadTaskTable());
    };

    const handleEditTask = (id: number) => {
        setSelectedTaskId(id);
        setIsEditModalOpen(true);
    };

    const handleOpenDetailModal = (id: number) => {
        setSelectedTaskId(id);
        setIsDetailModalOpen(true);
    };

    return (
        <div className="bg-[#FFFFFF66] shadow rounded-lg w-full p-8 flex justify-center h-full">
            <div className="w-full max-w-[1300px] h-auto sm:max-w-full">
                <TableContainer component={Paper} sx={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', borderRadius: '4px' }}>
                    <div className="p-4 shadow-none border-0 bg-white flex flex-row items-center w-full">
                        <h1 className="text-3xl text-gray-800 font-semibold">Tasks</h1>
                        <Button
                            variant="contained"
                            sx={{ ml: 'auto', bgcolor: 'green', textTransform: 'none' }}
                            onClick={() => {
                                setSelectedTaskId(undefined);
                                setIsEditModalOpen(true);
                            }}
                        >
                            Create new task
                        </Button>
                    </div>
                    <div className="w-full overflow-x-auto overflow-y-auto min-w-0" style={{ maxHeight: '60vh' }}>
                        <Table sx={{ minWidth: 650 }} size="small" className="min-w-[700px]">
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
                                {!tableData.loading && tableData.data?.items.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} sx={{ p: 0 }} height={53}>
                                            <Typography variant="body2" align="center">
                                                No tasks, continue with creating one!
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {tableData.loading
                                    ? [...Array(rowsPerPage)].map((_, i) => (
                                          <TableRow key={i}>
                                              <TableCell colSpan={7} sx={{ p: 0 }} height={53}>
                                                  <Skeleton variant="rectangular" height={15} width="100%" />
                                              </TableCell>
                                          </TableRow>
                                      ))
                                    : tableData.data?.items.map((row, index) => (
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
                                                  <Typography
                                                      variant="body1"
                                                      color="info"
                                                      onClick={() => handleOpenDetailModal(row.id)}
                                                      sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                                                  >
                                                      {row.title}
                                                  </Typography>
                                              </TableCell>
                                              <TableCell align="right" sx={{ color: '#444' }}>
                                                  {row.description && row.description.length > 40 ? (
                                                      <span title={row.description}>{row.description.slice(0, 40) + '...'}</span>
                                                  ) : (
                                                      row.description
                                                  )}
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
                                                  <IconButton aria-label="edit" color="primary" onClick={() => handleEditTask(row.id)}>
                                                      <EditIcon />
                                                  </IconButton>
                                                  <IconButton aria-label="delete" color="error" onClick={() => handleDeleteTask(row.id)}>
                                                      <DeleteForeverIcon />
                                                  </IconButton>
                                              </TableCell>
                                          </TableRow>
                                      ))}
                            </TableBody>
                        </Table>
                    </div>
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
            {isEditModalOpen && <AddEditTask isOpen={isEditModalOpen} id={selectedTaskId} onClose={() => setIsEditModalOpen(false)} />}
            {isDetailModalOpen && (
                <TaskDetail isOpen={isDetailModalOpen} id={selectedTaskId ?? -1} onClose={() => setIsDetailModalOpen(false)} />
            )}
        </div>
    );
};

export default Tasks;
