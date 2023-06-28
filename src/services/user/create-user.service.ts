import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { IsNotEmpty, Length } from "class-validator";

export class CreateUserRequest {

    @IsNotEmpty()
    @Length(4, 128)
    name: string;

}

@Injectable()
export class CreateUserService {

    constructor(private userRepository: UserRepository) { }

    async execute(request: CreateUserRequest): Promise<string> {
        const user = await this.userRepository.createUser(
            {
                name: request.name,
                createdAt: new Date()
            }
        )
        return user.id;
    }

}