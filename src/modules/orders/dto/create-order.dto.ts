import { IsBooleanString, IsDecimal, IsNotEmpty, IsString } from "class-validator"


export default class CreateOrderDto{

    @IsString()
    @IsNotEmpty()
    user_id: string

    @IsString()
    @IsNotEmpty()
    product_id: string

    @IsString()
    @IsNotEmpty()
    payment_id: string

    @IsDecimal()
    @IsNotEmpty()
    amount: number

    @IsDecimal()
    @IsNotEmpty()
    original_price: number

    @IsString()
    @IsNotEmpty()
    address: string

    @IsString()
    @IsNotEmpty()
    contact: string

    @IsBooleanString()
    @IsNotEmpty()
    status: boolean

}