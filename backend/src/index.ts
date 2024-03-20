import express from "express";
import userStatsRouter from "./routes/userStatsRouter";

const app = express();

app.use(express.json());

app.use("/userstats", userStatsRouter);

const port = 3000;
app.listen(port, () => console.log(`Listening on port: ${port}.`));

export default app;