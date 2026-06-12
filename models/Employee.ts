import mongoose, {
  Schema,
} from "mongoose";

const EmployeeSchema =
  new Schema(
    {
      name: String,
      contact: String,
      site: String,
      job: {
        type: String,
        enum: [
          "mistree",
          "labour",
        ],
      },
      salary: Number,
    },
    {
      timestamps: true,
    }
  );

export default
  mongoose.models
    .Employee ||
  mongoose.model(
    "Employee",
    EmployeeSchema
  );