import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  
  imports : [
    AuthModule,
    MongooseModule.forFeature([{name: Course.name, schema: CourseSchema}])],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
