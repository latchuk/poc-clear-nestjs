import { Injectable } from '@nestjs/common';
import { TaskRepository } from 'src/repositories/task.repository';
import { IsNotEmpty, Length } from "class-validator";

export class CreateTaskRequest {

    @IsNotEmpty()
    @Length(1, 128)
    description: string;

}

@Injectable()
export class CreateTaskService {

    constructor(private taskRepository: TaskRepository) { }

    async execute(userId: string, request: CreateTaskRequest): Promise<string> {
        // TODO: verificar se o usuário existe e lançar um erro caso não exista
        const task = await this.taskRepository.createTask(
            {
                description: request.description,
                createdAt: new Date(),
                completed: false,
                userId
            }
        )
        return task.id;
    }

}