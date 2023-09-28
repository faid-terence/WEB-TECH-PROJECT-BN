import { IsString, IsEmail, IsNotEmpty, IsBoolean, MinLength } from 'class-validator';




export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
}