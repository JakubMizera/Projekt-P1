import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoUsername = process.env.MONGOUSERNAME;
const password = process.env.PASSWORD;

const {
    MONGO_URI = `mongodb+srv://${mongoUsername}:${password}@adventuresport.ea7tjzl.mongodb.net/?retryWrites=true&w=majoritydb://localhost/AdventureSport`,
} = process.env;

export const client = new MongoClient(MONGO_URI);
export const db = client.db();