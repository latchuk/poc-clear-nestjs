import { RestClient } from "typed-rest-client";
import { Advice, AdviceClient, Slip } from "../client/advice.client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AdviceTypedRestClient implements AdviceClient {
    private readonly url: string = "https://api.adviceslip.com";

    constructor(private readonly restClient: RestClient) {}

    async findSomeAdvice(): Promise<Advice> {
        const data = await this.restClient.get<Slip>(`${this.url}/advice`);
        const result: Slip = data.result;
        const advice: Advice = {
            id: result.slip.id,
            advice: result.slip.advice
        };
        return advice;
    }
}