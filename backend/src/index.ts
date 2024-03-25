import express from "express";
import cors from "cors";
import userStatsRouter from "./routes/userStatsRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/userstats", userStatsRouter);

const port = 3000;
app.listen(port, () => console.log(`Listening on port: ${port}.`));

export default app;