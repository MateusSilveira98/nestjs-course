import { Injectable } from '@nestjs/common';
import { Lesson } from '../../../../shared/lesson';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from "mongoose"

@Injectable()
export class LessonsRepository {
  constructor(
    @InjectModel('Lessons')
    private lessonsModel: Model<Lesson>,
  ) { }

  search(
    courseId: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<Lesson[]> {
    return this.lessonsModel.find({course: mongoose.Types.ObjectId(courseId)}, null, {
      limit: pageSize,
      skip: pageNumber * pageSize,
      sort: {
        seqNo: sortOrder,
      },
    });
  }
}
