import { IsDecimal, IsOptional, IsString } from "class-validator"


export class UpdateReviewsDto {

    @IsString()
    @IsOptional()
    user_id: string

    @IsString()
    @IsOptional()
    product_id: string

    @IsDecimal()
    @IsOptional()
    user_score: number

    @IsDecimal()
    @IsOptional()
    global_score: number

    @IsString()
    @IsOptional()
    comments: string

}