import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  location: String,
  time: String,
  fraudResult: Boolean,
  date: Date
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);
