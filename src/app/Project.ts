export interface Task {
    id?: number;
    title: string;
    members: string;
    details: string;
    date: string;
    status: boolean;
}

export interface Project {
    id?: number;
    title: string;
    description: string;
    date: string;
    members: string[];
    tasks?: Task[];
    status?: boolean,
    category: string
}