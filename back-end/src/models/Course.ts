import mongoose, { Document, Schema } from 'mongoose';
import { CourseCategory } from '../interfaces/CourseCategory';
import { CourseStatus } from '../interfaces/CourseStatus';

interface ICourse extends Document {
  createdBy: string;
  title: string;
  description: string;
  address: string;
  images?: string[];
  price: number;
  accountNumber: string;
  status: CourseStatus;
  additionDate: Date;
  expirationDate: Date;
  eventDate: Date;
  eventHour: string;
  courseCapacity: number,
  reservedUserIds?: string[],
  category: CourseCategory;
  requirements?: string[];
  latitude?: number;
  longitude?: number;
}

const CourseSchema: Schema = new Schema({
  createdBy: { type: String, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  images: [String],
  price: { type: Number, required: true },
  accountNumber: { type: String, required: true },
  status: { type: String, required: true },
  additionDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
  eventDate: { type: Date, required: true },
  eventHour: { type: String, required: true },
  courseCapacity: { type: Number, required: true },
  reservedUserIds: [{ type: String, ref: 'User', required: false }],
  category: { type: String, enum: Object.values(CourseCategory), required: true },
  requirements: [String],
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
});

export default mongoose.model<ICourse>('Course', CourseSchema);
