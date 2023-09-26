import { Category } from "../schemas/course.schema";
import { IsString, IsNotEmpty, IsArray, IsNumber, IsOptional, MaxLength, ArrayNotEmpty } from 'class-validator';

export class UpdateCourseDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title: string;
  
    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    description: string;
  
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    lessons: [];
  
    @IsString()
    @IsNotEmpty()
    category: Category;
  
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    duration: number;

    @IsNumber()
    @IsOptional()
    averageRating: number;
  }