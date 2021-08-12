import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MONGO_CONNECTION } from './constants';
import { CoursesController } from './courses/controllers/courses.controller';
import { LessonsController } from './courses/controllers/lessons.controller';
import { CoursesModule } from './courses/courses.module';
import { GetUserMiddleware } from './middleware/get-user.middleware';

@Module({
  imports: [AuthModule, CoursesModule, MongooseModule.forRoot(MONGO_CONNECTION)],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(GetUserMiddleware).forRoutes(CoursesController, LessonsController);
  }
}
