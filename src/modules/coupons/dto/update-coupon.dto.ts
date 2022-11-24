import { IsBooleanString, IsDecimal, IsOptional, IsString } from "class-validator"



export class UpdateCouponsDto{
    
    @IsString()
    @IsOptional()
    payment_id: string

    @IsString()
    @IsOptional()
    coupon_code: string

    // @IsDate()
    @IsString()
    @IsOptional()
    validity: string

    @IsDecimal()
    @IsOptional()
    discount_rate: number

    @IsBooleanString()
    @IsOptional()
    active: boolean

}