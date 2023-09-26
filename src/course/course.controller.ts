import { Controller, Get, Post, Body } from '@nestjs/common';
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
}
