import { Controller, Get, Post, Body,Param } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
@Controller('courses')
export class CourseController {
    constructor(private courseService : CourseService) {}

    @Get()
    async getAllCourses() : Promise<Course[]>{
        return this.courseService.findAll();
    }
    @Post()
    async addNewCourse(
        @Body()
        course: CreateCourseDto
    ) : Promise<Course>{
        return this.courseService.addCourse(course);
    }
    @Get(':id')
    async getOneCourse(
        @Param('id')
        id: string
    ) : Promise<Course>{
        return this.courseService.findOne(id)
    }
}
