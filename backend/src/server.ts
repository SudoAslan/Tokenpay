import express from "express";
import cors from "cors";
import balanceRouter from "./routes/balance";
import transactionsRouter from "./routes/transactions";
import { connectToMongoDB } from "./lib/mongodb";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

connectToMongoDB();

app.use("/balance", balanceRouter);
app.use("/transaction",transactionsRouter);

app.listen(port, () => {
  console.log(`Backend läuft auf http://localhost:${port}`);
});
