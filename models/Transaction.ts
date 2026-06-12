import mongoose, {
  Schema,
  models,
  model,
} from "mongoose";

const TransactionSchema =
  new Schema(
    {
      party: {
        type: String,
        required: true,
        trim: true,
      },

      type: {
        type: String,
        enum: [
          "Credit",
          "Debit",
        ],
        required: true,
      },

      amount: {
        type: Number,
        required: true,
        min: 0,
      },

      category: {
        type: String,
        required: true,
        trim: true,
      },

      time: {
        type: String,
        required: true,
      },

      date: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

const Transaction =
  models.Transaction ||
  model(
    "Transaction",
    TransactionSchema
  );

export default Transaction;