import { CourseCategory } from "./course-category.model";
import { Status } from "./course-status.model";

export interface Course {
  _id: string,
  courseId: number,
  createdBy: string,
  title: string,
  description: string,
  address: string,
  images?: string[],
  price: number,
  accountNumber: number,
  status: Status,
  additionDate: Date,
  expirationDate: Date,
  category: CourseCategory,
  requirements?: string[],
  location?: {
    latitude: number,
    longitude: number,
  }
}
