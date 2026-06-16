import mongoose, {
  Schema,
} from "mongoose";

const AttendanceSchema =
  new Schema(
    {
      employeeId: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
      },

      date: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "Present",
          "Absent",
        ],
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

AttendanceSchema.index(
  {
    employeeId: 1,
    date: 1,
  },
  {
    unique: true,
  }
);

export default
  mongoose.models
    .Attendance ||
  mongoose.model(
    "Attendance",
    AttendanceSchema
  );