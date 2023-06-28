import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { PagedQuery } from '../shared/paged-query';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PagedResult } from 'src/repositories/shared/paged-result';

export class ListUserQuery extends PagedQuery {
    @IsOptional()
    @Type(() => String)
    @IsString()
    name?: string;
}

export class PagedUserResponse extends PagedResult<UserResponse> {}

export class UserResponse {
    id: string;
    name: string;
    createdAt: Date;
}

@Injectable()
export class ListUserService {

    constructor(private userRepository: UserRepository) { }

    async execute(query: ListUserQuery): Promise<PagedUserResponse> {
        const pagedUser = await this.userRepository.listUsers(query);
        const pagedUserResponse = {
            ...pagedUser,
            items: pagedUser.items.map(x => {
                const item: UserResponse = {
                    id: x.id,
                    name: x.name,
                    createdAt: x.createdAt
                };
                return item;
            })
        }
        return pagedUserResponse;
    }

}