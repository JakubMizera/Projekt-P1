import { CourseCategory } from "./course-category.model";
import { User } from "./user.model";

export interface Course {
    courseId: number,
    author: User,
    title: string,
    description: string,
    images: string[],
    price: number,
    accountNumber: number,
    isActive: boolean,
    additionDate: Date,
    expirationDate: Date,
    category: CourseCategory,
    requirements?: string[],
    location?: {
        latitude: number,
        longitude: number,
    }
}