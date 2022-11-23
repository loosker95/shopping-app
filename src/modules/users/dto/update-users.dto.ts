import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {

    @IsString()
    @IsOptional()
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsOptional()
    @MinLength(8)
    password: string;

}