import { Controller, Post, Body, Param, Get, Put, Delete, Query } from '@nestjs/common';
import { CompleteTaskService } from 'src/services/task/complete-task.service';
import { CreateTaskRequest, CreateTaskService } from 'src/services/task/create-task.service';
import { DeleteTaskService } from 'src/services/task/delete-task.service';
import { ListTaskQuery, ListTaskService, PagedTaskResponse } from 'src/services/task/list-task.service';
import { UncompleteTaskService } from 'src/services/task/uncomplete-task.service';

@Controller('v1/users/:userId/tasks')
export class TaskController {

    constructor(
        private completeTaskService: CompleteTaskService,
        private createTaskService: CreateTaskService,
        private listTaskService: ListTaskService,
        private uncompleteTaskService: UncompleteTaskService,
        private deleteTaskService: DeleteTaskService,
    ) { }

    @Post()
    async createTask(
        @Param('userId') userId: string,
        @Body() request: CreateTaskRequest
    ): Promise<string> {
        return await this.createTaskService.execute(userId, request);
    }

    @Get()
    async listTask(
        @Param('userId') userId: string,
        @Query() query: ListTaskQuery
    ): Promise<PagedTaskResponse> {
        return await this.listTaskService.execute(userId, query);
    }

    @Put(':taskId/completed')
    async completeTask(
        @Param('userId') userId: string, 
        @Param('taskId') taskId: string
    ): Promise<void> {
        return await this.completeTaskService.execute(userId, taskId);
    }

    @Put(':taskId/uncompleted')
    async uncompleteTask(
        @Param('userId') userId: string, 
        @Param('taskId') taskId: string
    ): Promise<void> {
        return await this.uncompleteTaskService.execute(userId, taskId);
    }

    @Delete(':taskId')
    async deleteTask(
        @Param('userId') userId: string, 
        @Param('taskId') taskId: string
    ): Promise<void> {
        return await this.deleteTaskService.execute(userId, taskId);
    }

}