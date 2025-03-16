"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactions = exports.createTransaction = void 0;
const Transaction_1 = require("../models/Transaction");
const createTransaction = async (req, res) => {
    try {
        const { sender, recipient, amount } = req.body;
        if (!sender || !recipient || !amount) {
            res.status(400).json({ error: "Alle Felder sind erforderlich!" });
            return;
        }
        if (isNaN(amount) || amount <= 0) {
            res.status(400).json({ error: "Der Betrag muss eine positive Zahl sein!" });
            return;
        }
        const transaction = new Transaction_1.Transaction({ sender, recipient, amount });
        await transaction.save();
        res.status(201).json(transaction);
    }
    catch (error) {
        res.status(500).json({ error: "Fehler beim Speichern der Transaktion" });
    }
};
exports.createTransaction = createTransaction;
const getTransactions = async (_req, res) => {
    try {
        const transactions = await Transaction_1.Transaction.find();
        res.json(transactions);
    }
    catch (error) {
        res.status(500).json({ error: "Fehler beim Abrufen der Transaktionen" });
    }
};
exports.getTransactions = getTransactions;
