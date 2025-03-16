import { Router } from "express";
import { createTransaction, getTransactions } from "../controllers/transactionController";

const transactionsRouter = Router();

transactionsRouter.post("/create", createTransaction);

transactionsRouter.get("/getAll", getTransactions);

export default transactionsRouter;
