import httpClient from 'src/config/httpClient';

export interface ITaskTableQuery {
    page?: number;
    size?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}

export interface ICreateTask {
    title: string;
    description?: string;
    location?: string;
    startAt: string;
    endAt: string;
}

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
