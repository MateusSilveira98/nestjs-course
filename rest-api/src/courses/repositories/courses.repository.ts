import { Injectable } from '@nestjs/common';
import { Course } from '../../../../shared/course';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CoursesRepository {
  constructor(
    @InjectModel('Course')
    private courseModel: Model<Course>,
  ) { }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find();
  }

  async findByCourseUrl(courseUrl: string): Promise<Course> {
    return this.courseModel.findOne({url: courseUrl});
  }

  async updateCourse(courseId: string, changes: Partial<Course>): Promise<Course> {
    return this.courseModel.findOneAndUpdate({_id: courseId}, changes, { new: true});
  }

  async deleteCourse(courseId: string): Promise<void> {
    return this.courseModel.deleteOne({_id: courseId});
  }

  async addCourse(course: Partial<Course>): Promise<Course> {
    const newCourse = this.courseModel(course);
    await newCourse.save();

    return newCourse.toObject({versionKey: false});
  }
}
