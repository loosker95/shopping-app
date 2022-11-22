import { IsNotEmpty, IsString } from "class-validator"

export class categoriesDto{
   
    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    category_name: string 

}