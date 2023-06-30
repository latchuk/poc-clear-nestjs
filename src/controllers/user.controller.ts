import { Controller, Post, Body, Get, Query, Delete, Param } from '@nestjs/common';
import { CreateUserService, CreateUserRequest } from 'src/services/user/create-user.service';
import { DeleteUserService } from 'src/services/user/delete-user.service';
import { FindUserWithSomeAdviceService, UserWithAdviceResponse } from 'src/services/user/find-user-with-some-advice.service';
import { ListUserQuery, ListUserService, PagedUserResponse } from 'src/services/user/list-user.service';

@Controller('v1/users')
export class UserController {

    constructor(
        private createUserService: CreateUserService,
        private listUserService: ListUserService,
        private deleteUserService: DeleteUserService,
        private findUserWithSomeAdviceService: FindUserWithSomeAdviceService
    ) { }

    @Post()
    async createUser(
        @Body() request: CreateUserRequest
    ): Promise<string> {
        return await this.createUserService.execute(request);
    }

    @Get()
    async listUsers(
        @Query() query: ListUserQuery
    ): Promise<PagedUserResponse> {
        return await this.listUserService.execute(query);
    }

    @Delete(':userId')
    async deleteTask(
        @Param('userId') userId: string
    ): Promise<void> {
        return await this.deleteUserService.execute(userId);
    }
    
    @Get(':userId/advice')
    async findUserWithSomeAdvice(
        @Param('userId') userId: string
    ): Promise<UserWithAdviceResponse> {
        return await this.findUserWithSomeAdviceService.execute(userId);
    }
}