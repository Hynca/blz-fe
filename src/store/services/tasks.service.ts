import httpClient from 'src/config/httpClient';
import { ICreateTask, ITaskTableQuery } from 'src/types/task-types';

const getTasksTable = (query: ITaskTableQuery) => httpClient.get('/tasks/table', { params: query });

const getTask = (id: number) => httpClient.get(`/tasks/${id}`);

const postNewTask = (query: ICreateTask) => httpClient.post('/tasks', query);

const putEditTask = (id: number, query: ICreateTask) => httpClient.put(`/tasks/${id}`, query);

const deleteTask = (id: number) => httpClient.delete(`/tasks/${id}`);

const TaskService = {
    getTasksTable,
    getTask,
    postNewTask,
    putEditTask,
    deleteTask
};

export default TaskService;
