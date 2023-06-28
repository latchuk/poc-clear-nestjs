import { Task } from "src/models/task.model";
import { ListTaskQuery } from "src/services/task/list-task.service";
import { PagedResult } from "./shared/paged-result";

export abstract class TaskRepository {
    abstract createTask(task: Task): Promise<Task>;
    abstract listTasks(userId: string, query: ListTaskQuery): Promise<PagedResult<Task>>;
    abstract completeTask(userId: string, taskId: string): Promise<void>;
    abstract uncompleteTask(userId: string, taskId: string): Promise<void>;
    abstract deleteTask(userId: string, taskId: string): Promise<void>;
}