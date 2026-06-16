import mongoose, { Schema } from "mongoose";

const PayrollSchema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      unique: true,
    },

    paid: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Payroll ||
  mongoose.model(
    "Payroll",
    PayrollSchema
  );