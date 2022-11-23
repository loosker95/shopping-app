import { IsBooleanString, IsDecimal, IsOptional, IsString } from "class-validator"


export default class UpdateOrderDto{

    @IsString()
    @IsOptional()
    user_id: string

    @IsString()
    @IsOptional()
    product_id: string

    @IsString()
    @IsOptional()
    payment_id: string

    @IsDecimal()
    @IsOptional()
    amount: number

    @IsDecimal()
    @IsOptional()
    original_price: number

    @IsString()
    @IsOptional()
    address: string

    @IsString()
    @IsOptional()
    contact: string

    @IsBooleanString()
    @IsOptional()
    status: boolean

}