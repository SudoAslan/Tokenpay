import { Request, Response } from "express";
import { Transaction } from "../models/Transaction";

export const createTransaction = async (req: Request, res: Response): Promise<void> => {
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

        const transaction = new Transaction({ sender, recipient, amount });
        await transaction.save();

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: "Fehler beim Speichern der Transaktion" });
    }
};

export const getTransactions = async (_req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Abrufen der Transaktionen" });
  }
};
