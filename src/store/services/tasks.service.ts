import httpClient from 'src/config/httpClient';

export interface ITaskTableQuery {
    page?: number;
    size?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}

// Update the function to use the params object for query parameters
const getTasksTable = (query: ITaskTableQuery) => httpClient.get('/tasks/table', { params: query });

const TaskService = {
    getTasksTable
};

export default TaskService;
