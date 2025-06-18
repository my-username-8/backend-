const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
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
    parentTodoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
      default: null,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

todoSchema.virtual("subTodos", {
  ref: "Todo",
  localField: "_id",
  foreignField: "parentTodoId",
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
