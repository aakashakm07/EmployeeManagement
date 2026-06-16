import mongoose, {
  Schema,
  models,
  model,
} from "mongoose";

const ProjectSchema = new Schema(
  {
    customer: {
      type: String,
      required: true,
    },

    contact: {
      type: String,
      required: true,
    },

    place: {
      type: String,
      required: true,
    },

    product: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    received: {
      type: Number,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["PAID", "PENDING"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Project ||
  model(
    "Project",
    ProjectSchema
  );