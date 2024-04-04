import express from "express";
import cors from "cors";
import userStatsRouter from "./routes/userStatsRouter";
import * as functions from 'firebase-functions';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/userstats", userStatsRouter);


export const api = functions.https.onRequest(app);

export default app;