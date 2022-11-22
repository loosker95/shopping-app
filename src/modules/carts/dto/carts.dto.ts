import { IsNotEmpty, IsString } from "class-validator"


export class Cartsdto{
  
    @IsString()
    @IsNotEmpty()
    user_id: string

    @IsString()
    @IsNotEmpty()
    product_id: string
    
}