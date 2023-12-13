import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  userId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

const UserSchema: Schema = new Schema({
  userId: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true }
});

export default mongoose.model<IUser>('User', UserSchema);
