import { Injectable } from '@nestjs/common';
import { Course } from './schemas/course.schema';
import {InjectModel} from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { promises } from 'dns';
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
}
