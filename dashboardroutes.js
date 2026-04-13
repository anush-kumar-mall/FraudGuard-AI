import express from "express";
import Transaction from "../models/Transaction.js";
import Expense from "../models/Expense.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/summary", protect, async (req, res) => {
  const expenses = await Expense.find({ userId: req.user });
  const transactions = await Transaction.find({ userId: req.user });

  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
  const fraudCount = transactions.filter(t => t.fraudResult).length;

  res.json({ totalExpenses, fraudCount, transactions });
});

export default router;
