import * as z from 'zod';

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

export type User = z.infer<typeof User>;