// import dotenv from 'dotenv';
// import express, { Express } from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import coursesRouter from './routes/courses';
// import userRouter from './routes/users';
// import passport from 'passport';
// import cookieSession from 'cookie-session';
// import authRouter from './routes/auth';
// import './auth/googleAuth';

// dotenv.config();
// const app: Express = express();

// mongoose.connect(process.env.MONGODB_URI as string)
//   .then(() => console.log("MongoDB successfully connected"))
//   .catch(err => console.log(err));

// app.use(cors());
// app.use(express.json());

// // Cookie session configuration
// app.use(cookieSession({
//   name: 'adventureSport_session',
//   keys: ['key1', 'key2'],
//   maxAge: 24 * 60 * 60 * 1000,
// }))

// // Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());

// // Routes
// app.use('/api', authRouter);
// app.use('/api', coursesRouter);
// app.use('/api', userRouter);

// const PORT: string | number = process.env.PORT || 5000;
// app.get('/', (req, res) => {
//   res.send('Witaj w Adventure Sport!');
// });
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import coursesRouter from './routes/courses';
import userRouter from './routes/users';
import passport from 'passport';
import session from 'express-session';
import authRouter from './routes/auth';
import './auth/googleAuth';

dotenv.config();
const app: Express = express();

mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Ustaw na `true` w przypadku HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', authRouter);
app.use('/api', coursesRouter);
app.use('/api', userRouter);

const PORT: string | number = process.env.PORT || 5000;

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email', 'openid'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('http://localhost:4200/user');
});

app.get('/', (req, res) => {
  res.send('Witaj w Adventure Sport!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
