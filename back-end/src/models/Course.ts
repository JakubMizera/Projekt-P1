import mongoose, { Document, Schema } from 'mongoose';
enum Status {
  Active = 'Aktywny',
  Inactive = 'Nieaktywny',
}
enum CourseCategory {
  None = 'Brak',
  Shooting = 'Strzelectwo',
  Parachuting = 'Spadochroniarstwo',
  CarRacing = 'Wyścigi samochodowe',
  Archery = 'Łucznictwo',
}
interface ICourse extends Document {
  // courseId: number;
  title: string;
  description: string;
  address: string;
  images?: string[];
  price: number;
  accountNumber: number;
  status: Status;
  // isActive: boolean;
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
  // courseId: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  images: [String],
  price: { type: Number, required: true },
  accountNumber: { type: Number, required: true },
  status: { type: String, required: true },
  // isActive: { type: Boolean, required: true },
  additionDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
   category: { type: String, enum: Object.values(CourseCategory), required: true },
  requirements: [String],
  location: {
      latitude: Number,
      longitude: Number
  }
});

export default mongoose.model<ICourse>('Course', CourseSchema);
