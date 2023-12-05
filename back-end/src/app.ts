import dotenv from 'dotenv';

import express, { Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import coursesRouter from './routes/courses';

dotenv.config();
const app: Express = express();

mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use('/api', coursesRouter);

const PORT: string | number = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Witaj w Adventure Sport!');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
