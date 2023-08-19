import { Schema, model, Document } from "mongoose";

const todoSchema = new Schema(
  {
    todo: { type: String, required: true },
    completed: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Todo = model("Todo", todoSchema);

export default Todo;
