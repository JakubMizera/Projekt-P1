import { CourseCategory } from "./course-category.model";
import { Status } from "./course-status.model";

export interface Course {
  _id: string,
  createdBy: string,
  title: string,
  description: string,
  address: string,
  images?: string[],
  price: number,
  accountNumber: string,
  status: Status,
  additionDate: Date,
  expirationDate: Date,
  eventDate: Date,
  eventHour: string,
  courseCapacity: number,
  reservedUserIds?: string[],
  category: CourseCategory,
  requirements?: string[],
  location?: {
    latitude: number,
    longitude: number,
  }
}
