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

export interface ITask {
    id: number;
    title: string;
    description: string;
    startAt: string;
    endAt: string;
    location: string;
    createdAt: string;
    updatedAt: string;
}

export interface ITaskForm {
    title: string;
    description: string;
    location: string;
    startAt: string;
    endAt: string;
}
