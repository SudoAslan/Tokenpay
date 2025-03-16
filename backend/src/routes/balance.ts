import { Router } from "express";
import { getBalance } from "../controllers/balanceController";

const balanceRouter = Router();

balanceRouter.get("/",getBalance);

export default balanceRouter;