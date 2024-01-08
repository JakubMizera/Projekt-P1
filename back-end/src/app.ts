import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import coursesRouter from './routes/courses';
import userRouter from './routes/users';
import passport from 'passport';
import session from 'express-session';
import './auth/googleAuth';
import authRouter from './routes/auth';
import contactRouter from './routes/contacts';

dotenv.config();
const app: Express = express();

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', authRouter);
app.use('/api', coursesRouter);
app.use('/api', userRouter);
app.use('/api', contactRouter);
const PORT: string | number = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Witaj w Adventure Sport!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
