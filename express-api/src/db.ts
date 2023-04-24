import { MongoClient } from 'mongodb';

// TO DO - update connection to db
const username = encodeURIComponent("JakubMizera");
const password = encodeURIComponent("sG7KeFtl5HjupZ4B");

const {
    MONGO_URI = `mongodb+srv://${username}:${password}@adventuresport.ea7tjzl.mongodb.net/?retryWrites=true&w=majoritydb://localhost/AdventureSport`,
} = process.env;

export const client = new MongoClient(MONGO_URI);
export const db = client.db();