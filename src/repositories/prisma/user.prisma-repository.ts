import { User } from "src/models/user.model";
import { UserRepository } from "../user.repository";
import { PrismaService } from "./prisma.service";
import { randomUUID } from "node:crypto";
import { Injectable } from "@nestjs/common";
import { ListUserQuery } from "src/services/user/list-user.service";
import { PagedResult } from "../shared/paged-result";

@Injectable()
export class UserPrismaRepository implements UserRepository {

    constructor(private prisma: PrismaService) { }

    async createUser(user: User): Promise<User> {
        const userModel = await this.prisma.user.create(
            {
                data: {
                    id: randomUUID(),
                    name: user.name,
                    createdAt: user.createdAt
                }
            }
        )
        user = { ...userModel };
        return user;
    }

    async listUsers(query: ListUserQuery): Promise<PagedResult<User>> {
        const count = await this.prisma.user.count(
            {
                where: {
                    AND: [
                        query.name ? { name: { contains: query.name } } : {}
                    ]
                }
            }
        );
        const tasks = await this.prisma.user.findMany(
            {
                where: {
                    AND: [
                        query.name ? { name: { contains: query.name } } : {}
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
            totalPages: Math.ceil(count / query.pageSize),
            page: query.page,
            pageSize: query.pageSize
        };

    }

    async deleteUser(userId: string): Promise<void> {
        await this.prisma.user.deleteMany({
            where: {
                id: userId
            }
        });
    }

}