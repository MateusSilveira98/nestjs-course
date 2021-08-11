import { BadRequestException, Body, Controller, Delete, Get, Inject, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ToIntegerPipe } from '../../pipes/to-integer.pipe';
import { Course } from '../../../../shared/course';
import { CoursesRepository } from '../repositories/courses.repository';

@Controller(`courses`)
export class CoursesController {
  constructor(
    private coursesDB: CoursesRepository) {}

  @Post()
  async createCourse(
    @Body()
    course: Partial<Course>,
  ): Promise<Course> {
    return this.coursesDB.addCourse(course);
  }

  @Get('')
  async findAllCourses(): Promise<Course[]> {
    return this.coursesDB.findAll();
  }

  @Get(':courseUrl')
  async findCoursesByUrl(
    @Param(`courseUrl`)
    courseUrl: string,
  ): Promise<Course> {
    const course = await this.coursesDB.findByCourseUrl(courseUrl);
    if (!course) {
      throw new NotFoundException(`Course not found by url ${courseUrl}`);
    }
    return course;
  }

  @Put(':courseId')
  async updateCourse(
    @Param(`courseId`)
    courseId: string,
    @Body()
    changes: Partial<Course>,
  ): Promise<Course> {

    if (changes._id) {
      throw new BadRequestException(`Can't pass _id from body`);
    }
    return this.coursesDB.updateCourse(courseId, changes);
  }

  @Delete(':courseId')
  async deleteCourse(
    @Param(`courseId`)
    courseId: string,
  ): Promise<void> {
    return this.coursesDB.deleteCourse(courseId);
  }
}
