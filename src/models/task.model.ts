import { User } from "./user.model";

export class Task {
    id?: string;
    description: string;
    createdAt: Date;
    completed: boolean;
    user?: User;
    userId: string;
}