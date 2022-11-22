import {IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    category_id: string

    @IsString()
    @IsNotEmpty()
    product_name: string

    @IsString()
    @IsOptional()
    description: string

    @IsString()
    @IsNotEmpty()
    brand: string

    @IsString()
    @IsNotEmpty()
    stock: string

    @IsDecimal()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsOptional()
    rating: number
}