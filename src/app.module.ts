import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository'
import { UserPrismaRepository } from './repositories/prisma/user.prisma-repository';
import { CreateUserService } from './services/user/create-user.service';
import { UserController } from './controllers/user.controller';
import { PrismaService } from './repositories/prisma/prisma.service';
import { TaskRepository } from './repositories/task.repository';
import { TaskPrismaRepository } from './repositories/prisma/task.prisma-repository';
import { ListUserService } from './services/user/list-user.service';
import { TaskController } from './controllers/task.controller';
import { CreateTaskService } from './services/task/create-task.service';
import { ListTaskService } from './services/task/list-task.service';
import { CompleteTaskService } from './services/task/complete-task.service';
import { DeleteTaskService } from './services/task/delete-task.service';
import { UncompleteTaskService } from './services/task/uncomplete-task.service';
import { DeleteUserService } from './services/user/delete-user.service';

@Module({
  imports: [],
  controllers: [
    UserController,
    TaskController
  ],
  providers: [

    // User Services
    CreateUserService,
    ListUserService,
    DeleteUserService,

    // Task Services
    CompleteTaskService,
    CreateTaskService,
    DeleteTaskService,
    ListTaskService,
    UncompleteTaskService,

    // Repositories
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository
    },
    {
      provide: TaskRepository,
      useClass: TaskPrismaRepository
    }

  ],
})
export class AppModule {}
