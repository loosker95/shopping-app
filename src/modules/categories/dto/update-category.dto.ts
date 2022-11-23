import {IsOptional, IsString } from "class-validator"

export class updateCategoryDto{
   
    @IsString()
    @IsOptional()
    description: string

    @IsString()
    @IsOptional()
    category_name: string 

}