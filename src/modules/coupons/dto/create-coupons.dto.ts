import { IsBooleanString, IsDate, IsDecimal, IsNotEmpty, IsString } from "class-validator"



export class CreateCouponsDto{
    
    @IsString()
    @IsNotEmpty()
    payment_id: string

    @IsString()
    @IsNotEmpty()
    coupon_code: string

    // @IsDate()
    @IsString()
    @IsNotEmpty()
    validity: string

    @IsDecimal()
    @IsNotEmpty()
    discount_rate: number

    @IsBooleanString()
    @IsNotEmpty()
    active: boolean

}