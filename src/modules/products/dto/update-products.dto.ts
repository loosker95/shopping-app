import {IsDecimal, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductsDto {

    @IsString()
    @IsOptional()
    category_id: string

    @IsString()
    @IsOptional()
    product_name: string

    @IsString()
    @IsOptional()
    description: string

    @IsString()
    @IsOptional()
    brand: string

    @IsString()
    @IsOptional()
    stock: string

    @IsDecimal()
    @IsOptional()
    price: number;

    @IsNumber()
    @IsOptional()
    rating: number
}