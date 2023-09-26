import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
export enum Category {
    WEB_DEVELOPMENT = "webdev",
    MOBILE_DEVELOPMENT = "mobdev",
    DATABASE_DEVELOPMENT = "databasedev",
    PROGRAMMING_LANGUAGES = "programing"
}

@Schema({
    timestamps: true
})

export class Course {
    @Prop({required: true, unique: true})
    title: string;

    @Prop()
    description: string;

    @Prop()
    lessons: [];
    @Prop()
    duration : number;

    @Prop()
    category: Category
    @Prop() 
    price: number;

    @Prop()
    averageRating: number;

}


export const CourseSchema = SchemaFactory.createForClass(Course);