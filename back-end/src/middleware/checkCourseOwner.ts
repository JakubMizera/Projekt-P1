import { NextFunction, Response, Request } from 'express';
import Course from '../models/Course';

export const checkCourseOwner = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userId = req.user._id;
    const courseId = req.params.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send(`Course with id = ${courseId} was not found`);
    }

    if (course.createdBy.toString() !== userId.toString()) {
      return res.status(403).send('User is not authorized to edit this course');
    }
    next();
  } catch (error) {
    res.status(500).send(`Server error: ${error}`);
  }
}
