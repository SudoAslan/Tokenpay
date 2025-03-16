import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const Transaction = mongoose.model("Transaction", transactionSchema);
