import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: String,
    status: { type: String, enum: ["Todo", "In Progress", "Done"] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
