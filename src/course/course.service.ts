import { Injectable, BadRequestException, UsePipes } from '@nestjs/common';
import { Course } from './schemas/course.schema';
import {InjectModel} from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { promises } from 'dns';
import { CreateCourseDto } from './dto/create-course.dto';
import { ValidationPipe } from '@nestjs/common';
@Injectable()
export class CourseService {
    constructor(
        @InjectModel(Course.name)
        private courseModel : mongoose.Model<Course>
    ){}

    async findAll() : Promise<Course[]>{
        const courses = await this.courseModel.find();

        return courses;
    }
    async findOne(id: string) : Promise<Course>{
        const course = await this.courseModel.findById(id);
        if(!course){
            throw new BadRequestException('Course does not exist');
        }
        return course;
    }
    async addCourse(course: CreateCourseDto): Promise<Course> {
        const { title, description, lessons, category, averageRating, price } = course;
        if (!title || !description ||!lessons || !category|| !averageRating|| !price) {
            throw new BadRequestException('Invalid Inputs.');
        }
        try {
            const newCourse = await this.courseModel.create(course);
            return newCourse;
        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException('Course with the same title already exists.');
            }
            throw new BadRequestException('Failed to add the course. Please try again later.');
        }
    }

    async updateCourse(id: string , course:Course) : Promise<Course>{
        const { title, description, lessons, category, averageRating, price } = course;
        if (!title || !description ||!lessons || !category|| !averageRating|| !price) {
            throw new BadRequestException('Invalid Inputs.');
        }
       try {
        return await this.courseModel.findByIdAndUpdate(id, course, {
            new: true,
            runValidators: true
        });
        
       } catch (error) {
        if (error.code === 11000) {
            throw new BadRequestException('Course with the same title already exists.');
        }
        throw new BadRequestException('Failed to add the course. Please try again later.');
       }
    }
    async deleteCourse(id: string): Promise<{ success: boolean, message: string, courses?: Course[] }> {
        try {
            const deletedCourse = await this.courseModel.findByIdAndDelete(id);
    
            if (!deletedCourse) {
                throw new Error("Course not found");
            }
    
            const remainingCourses = await this.courseModel.find();
    
            return {
                success: true,
                message: "Course deleted successfully",
                courses: remainingCourses
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || "Error deleting course",
            };
        }
    }
    
}
