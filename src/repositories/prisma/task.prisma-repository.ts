import { PrismaService } from "./prisma.service";
import { randomUUID } from "node:crypto";
import { Injectable } from "@nestjs/common";
import { Task } from "src/models/task.model";
import { TaskRepository } from "../task.repository";
import { ListTaskQuery } from "src/services/task/list-task.service";
import { PagedResult } from "../shared/paged-result";

@Injectable()
export class TaskPrismaRepository implements TaskRepository {

    constructor(private prisma: PrismaService) { }    
    
    async createTask(task: Task): Promise<Task> {
        const savedTask = await this.prisma.task.create(
            {
                data: {
                    id: randomUUID(),
                    description: task.description,
                    createdAt: task.createdAt,
                    completed: task.completed,
                    userId: task.userId
                }
            }
        )
        return savedTask;
    }
    
    async listTasks(userId: string, query: ListTaskQuery): Promise<PagedResult<Task>> {
        const count = await this.prisma.task.count(
            {
                where: {
                    AND: [
                        { userId: userId },
                        query.description ? { description: { contains: query.description } } : {}
                    ]
                }
            }
        );
        const tasks = await this.prisma.task.findMany(
            {
                where: {
                    AND: [
                        { userId: userId },
                        query.description ? { description: { contains: query.description } } : {}
                    ]
                },
                orderBy: { createdAt: 'asc' },
                skip: query.pageSize * (query.page - 1),
                take: query.pageSize
            }
        );
        return {
            items: tasks,
            totalItems: count,
            totalPages:  Math.ceil(count / query.pageSize),
            page: query.page,
            pageSize: query.pageSize
        };
    }

    async completeTask(userId: string, taskId: string): Promise<void> {
        await this.prisma.task.updateMany({
            where: {
                AND: [
                    { id: taskId },
                    { userId: userId }
                ]
            },
            data: {
                completed: true
            }
        });
    }
    
    async uncompleteTask(userId: string, taskId: string): Promise<void> {
        await this.prisma.task.updateMany({
            where: {
                AND: [
                    { id: taskId },
                    { userId: userId }
                ]
            },
            data: {
                completed: false
            }
        });
    }
    
    async deleteTask(userId: string, taskId: string): Promise<void> {
        await this.prisma.task.deleteMany({
            where: {
                AND: [
                    { id: taskId },
                    { userId: userId }
                ]
            }
        });
    }

}