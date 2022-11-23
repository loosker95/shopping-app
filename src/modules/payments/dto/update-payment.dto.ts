import {IsBooleanString, IsDecimal, IsOptional, IsString } from "class-validator";

export class UpdatePaymentDto {

    @IsDecimal()
    @IsOptional()
    amount: number;

    @IsBooleanString()
    @IsOptional()
    status: boolean;

    @IsString()
    @IsOptional()
    payment_method: string;

}