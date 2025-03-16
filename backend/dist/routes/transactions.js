"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactionController_1 = require("../controllers/transactionController");
const transactionsRouter = (0, express_1.Router)();
// POST-Route zum Erstellen einer neuen Transaktion
transactionsRouter.post("/create", transactionController_1.createTransaction);
// GET-Route zum Abrufen aller Transaktionen
transactionsRouter.get("/getAll", transactionController_1.getTransactions);
exports.default = transactionsRouter;
