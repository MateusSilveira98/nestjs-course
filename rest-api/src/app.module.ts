import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from './constants';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [CoursesModule, MongooseModule.forRoot(MONGO_CONNECTION)],
})
export class AppModule {

}
