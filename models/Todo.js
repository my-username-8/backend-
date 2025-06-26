const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  entry: {
    type: {
      type: String,
      required: true,
      enum: ["text", "image", "pdf"],
      default: "text",
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
  },
  completed: {
    type: Boolean,
  },
  date: {
    type: Date,
    required: true,
  },
  parentTodoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todo",
    default: null,
  },
});

todoSchema.virtual("subTodos", {
  ref: "Todo",
  localField: "_id",
  foreignField: "parentTodoId",
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
