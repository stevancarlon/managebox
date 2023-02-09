export interface UserProject {
    id?: number;
    title: string;
    status: boolean;
}

export interface User {
    id?: number;
    username: string;
    password: string;
    projects?: UserProject[];
}