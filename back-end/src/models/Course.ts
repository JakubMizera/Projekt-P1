import mongoose, { Document, Schema } from 'mongoose';
import { CourseCategory } from '../interfaces/CourseCategory';

enum Status {
  Active = 'Aktywny',
  Inactive = 'Nieaktywny',
}

interface ICourse extends Document {
  title: string;
  description: string;
  address: string;
  images?: string[];
  price: number;
  accountNumber: number;
  status: Status;
  additionDate: Date;
  expirationDate: Date;
  category: CourseCategory;
  requirements?: string[];
  location?: {
    latitude: number;
    longitude: number;

  };
}

const CourseSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  images: [String],
  price: { type: Number, required: true },
  accountNumber: { type: Number, required: true },
  status: { type: String, required: true },
  additionDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
  category: { type: String, enum: Object.keys(CourseCategory), required: true },
  requirements: [String],
  location: {
    latitude: Number,
    longitude: Number
  }
});

export default mongoose.model<ICourse>('Course', CourseSchema);
