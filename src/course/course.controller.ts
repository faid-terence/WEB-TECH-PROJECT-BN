import { Controller, Get, Post, Body,Param, Put , Delete, Query} from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
@Controller('courses')
export class CourseController {
    constructor(private courseService : CourseService) {}

    @Get()
    async getAllCourses(@Query('searchQuery') searchQuery?: string): Promise<Course[]> {
      return this.courseService.findAll(searchQuery);
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

    @Put(':id')
    async updateCourse(
        @Param('id')
        id : string,
        @Body()
        course: UpdateCourseDto
    ) : Promise<Course>{
        return this.courseService.updateCourse(id, course)
    }

    @Delete(':id')

    async deleteCourse(
        @Param('id')
        id: string
    ) : Promise<{ success: boolean, message: string, courses?: Course[]} >{
        return this.courseService.deleteCourse(id);
    }

}
