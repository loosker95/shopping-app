import { IsBoolean, IsBooleanString, IsDecimal, IsNotEmpty, IsString } from "class-validator";

export class CreatePaymentDto {

    @IsDecimal()
    @IsNotEmpty()
    amount: number;

    @IsBooleanString()
    @IsNotEmpty()
    status: boolean;

    @IsString()
    @IsNotEmpty()
    payment_method: string;

}