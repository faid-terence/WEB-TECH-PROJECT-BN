import { Controller, Get } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './schemas/course.schema';
@Controller('course')
export class CourseController {
    constructor(private courseService : CourseService) {}

    @Get()
    async getAllCourses() : Promise<Course[]>{
        return this.courseService.findAll();
    }
}
