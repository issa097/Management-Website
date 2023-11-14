const mongoose = require("mongoose");

// تعريف سكيما لمستند "تاسك"
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },

  Priority: {
    type: String,
    
  },
});

// تعريف موديل "تاسك" باستخدام السكيما
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
