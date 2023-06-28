import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class DeleteUserService {

    constructor(private userRepository: UserRepository) { }

    async execute(userId: string): Promise<void> {
        const task = await this.userRepository.deleteUser(userId);
    }

}