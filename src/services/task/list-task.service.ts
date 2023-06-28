import { Injectable } from '@nestjs/common';
import { TaskRepository } from 'src/repositories/task.repository';
import { PagedQuery } from '../shared/paged-query';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PagedResult } from 'src/repositories/shared/paged-result';

export class ListTaskQuery extends PagedQuery {
    @IsOptional()
    @Type(() => String)
    @IsString()
    description?: string;
}

export class PagedTaskResponse extends PagedResult<TaskResponse> {}

export class TaskResponse {
    id: string;
    description: string;
    completed: boolean;
}

@Injectable()
export class ListTaskService {

    constructor(private taskRepository: TaskRepository) { }

    async execute(userId: string, query: ListTaskQuery): Promise<PagedTaskResponse> {
        const pagedTask = await this.taskRepository.listTasks(userId, query);
        const pagedTaskResponse = {
            ...pagedTask,
            items: pagedTask.items.map(x => {
                const item: TaskResponse = {
                    id: x.id,
                    description: x.description,
                    completed: x.completed
                };
                return item;
            })
        }
        return pagedTaskResponse;
    }

}