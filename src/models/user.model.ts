import { Task } from "./task.model";

export class User {
    id?: string;
    name: string;
    createdAt: Date;
    tasks?: Task[];
}