import express from "express";
import axios from "axios";
import Transaction from "../models/Transaction.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { amount, location, time } = req.body;

  const aiResponse = await axios.post("http://localhost:5001/predict", {
    amount,
    location,
    time
  });

  const fraudResult = aiResponse.data.fraud;

  const transaction = await Transaction.create({
    userId: req.user,
    amount,
    location,
    time,
    fraudResult,
    date: new Date()
  });

  res.json(transaction);
});

export default router;
