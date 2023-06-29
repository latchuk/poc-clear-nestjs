export class Advice {
    id: number;
    advice: string;
}

export class Slip {
    slip: Advice;
}

export abstract class AdviceClient {
    abstract findSomeAdvice(): Promise<Advice>;
}