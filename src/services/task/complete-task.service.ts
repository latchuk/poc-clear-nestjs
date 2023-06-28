import { Injectable } from '@nestjs/common';
import { TaskRepository } from 'src/repositories/task.repository';

@Injectable()
export class CompleteTaskService {

    constructor(private taskRepository: TaskRepository) { }

    async execute(userId: string, taskId: string): Promise<void> {
        const task = await this.taskRepository.completeTask(userId, taskId);
    }

}