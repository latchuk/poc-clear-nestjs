import { Type } from "class-transformer";
import { IsNumber, IsOptional, Max, Min } from "class-validator";

export class PagedQuery {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Max(1000)
    pageSize?: number = 10;
}