import * as z from 'zod';
import { db } from '../../db';
import { WithId } from 'mongodb'

// Validation schema for User
// TO DO - change user for project needs 
export const User = z.object({
    userName: z.string().min(3),
    firstName: z.string().min(1),
    surName: z.string().min(3),
    email: z.string().min(5).email(),
    phoneNumber: z.number().int(),
    country: z.string(),
});

// Creating interface for User
export type User = z.infer<typeof User>;
// Added Id from MongoDB 
export type UserWithId = WithId<User>;
// Connecting to MongoDB
export const Users = db.collection<User>('users');
