import { IsString, IsEmail, IsNotEmpty, IsBoolean, MinLength } from 'class-validator';



export class RegisterUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
  
    @IsString()
    @IsNotEmpty()
    gender: string;
  
    @IsBoolean()
    isAdmin: boolean;

    @IsBoolean()
    isVerified: boolean;

    @IsString()
    verificationToken: string


  }