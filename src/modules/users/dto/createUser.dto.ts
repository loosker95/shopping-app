import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

   @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    avatar: string;

    @IsBoolean()
    @IsNotEmpty()
    verified: boolean;

   @IsString()
   @IsNotEmpty()
    role: string;

   @IsDate()
    created_at: string;

    @IsDate()
    updated_at: string;
}