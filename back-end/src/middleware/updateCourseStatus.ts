import { Request, Response, NextFunction } from 'express';
import Course from '../models/Course';
import { CourseStatus } from '../interfaces/CourseStatus';

export async function updateCourseStatus(req: Request, res: Response, next: NextFunction) {
  
  const expiredCourses = await Course.find({ expirationDate: { $lt: new Date() }, status: CourseStatus.Active });
  for (const course of expiredCourses) {
    course.status = CourseStatus.Inactive;
    await course.save();
  }
  
  const activeCourses = await Course.find({ expirationDate: { $gte: new Date() }, status: CourseStatus.Inactive });
  for (const course of activeCourses) {
    course.status = CourseStatus.Active;
    await course.save();
  }

  next();
}
