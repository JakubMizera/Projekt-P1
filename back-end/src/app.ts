import dotenv from 'dotenv';

import express, { Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import coursesRouter from './routes/courses';
import userRouter from './routes/users';
import session from 'express-session';
import authRouter from './routes/auth';


dotenv.config();
const app: Express = express();

app.use(session({
  secret: process.env.GOOGLE_CLIENT_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using https
    maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
  },
}));

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use('/api', coursesRouter);
app.use('/api', userRouter);
app.use('/api', authRouter);
const PORT: string | number = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Witaj w Adventure Sport!');
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
