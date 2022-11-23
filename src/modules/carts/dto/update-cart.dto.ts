import {IsOptional, IsString } from "class-validator"


export class UpdateCartsdto{
  
    @IsString()
    @IsOptional()
    user_id: string

    @IsString()
    @IsOptional()
    product_id: string
    
}