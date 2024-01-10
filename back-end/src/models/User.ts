import mongoose, { Document, Schema } from 'mongoose';
import { UserRole } from '../interfaces/UserRole';

export interface IUser extends Document {
  googleId: string;
  displayName: string;
  email?: string;
  picture?: string;
  name?: string;
  surname?: string;
  role: UserRole;
}

const UserSchema: Schema = new Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false,
  },
  surname: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    required: true,
  }
});

export const User = mongoose.model<IUser>('User', UserSchema);