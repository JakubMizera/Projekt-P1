import { Request, Response, NextFunction } from 'express';
import Course from '../models/Course';
import { CourseStatus } from '../interfaces/CourseStatus'; 

async function updateCourseStatus(req: Request, res: Response, next: NextFunction) {
  const courses = await Course.find({ expirationDate: { $lt: new Date() }, status: CourseStatus.Active });

  for (const course of courses) {
    course.status = CourseStatus.Inactive;
    await course.save();
  }

  next();
}

export default updateCourseStatus;
