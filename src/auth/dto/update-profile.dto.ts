import { IsString, IsEmail, IsNotEmpty, IsBoolean, MinLength } from 'class-validator';



export class UpdateProfileDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(6) // Minimum password length of 6 characters
    password: string;
  
    @IsString()
    @IsNotEmpty()
    gender: string;
  
    @IsBoolean()
    isAdmin: boolean;
  }