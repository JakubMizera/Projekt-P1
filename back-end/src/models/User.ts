import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
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
    required: true
  },
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
    required: true
  },
});

export default mongoose.model<IUser>('User', UserSchema);
