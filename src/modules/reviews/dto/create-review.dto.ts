import { IsDecimal, IsNotEmpty, IsOptional, IsString } from "class-validator"


export class CreateReviewsDto {

    @IsString()
    @IsNotEmpty()
    user_id: string

    @IsString()
    @IsNotEmpty()
    product_id: string

    @IsDecimal()
    @IsNotEmpty()
    user_score: number

    @IsDecimal()
    @IsNotEmpty()
    global_score: number

    @IsString()
    @IsOptional()
    comments: string

}