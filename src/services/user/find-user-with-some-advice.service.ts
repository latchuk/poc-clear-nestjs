import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { AdviceClient } from "src/clients/client/advice.client";
import { UserRepository } from "src/repositories/user.repository";

export class UserWithAdviceResponse {
    id: string;
    name: string;
    advice: string;
    createdAt: Date;
}

@Injectable()
export class FindUserWithSomeAdviceService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly adviceClient: AdviceClient
    ) {}

    async execute(userId: string): Promise<UserWithAdviceResponse> {
        const user = await this.userRepository.findUserById(userId);
        
        if (!user) {
            throw new NotFoundException('Usuário não encontrado.');
        }

        const advice = await this.adviceClient.findSomeAdvice();

        const response: UserWithAdviceResponse = {
            id: user.id,
            name: user.name,
            advice: advice.advice,
            createdAt: user.createdAt
        }

        return response;
    }
}