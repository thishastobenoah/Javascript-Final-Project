import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri: string = process.env.URI || "mongodb+srv://admin:admin@cluster0.60kd0fw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client: MongoClient = new MongoClient(uri);

export const getClient = async () => {
  await client.connect();
  return client;
};