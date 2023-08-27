import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },

  description: {
    type: String,
    required: [true, "Description is required"],
  },

  completed: {
     type: Boolean,
     default: false,
   },

   user: {
     type: mongoose.Types.ObjectId,
     ref:'User',
     required: [true, 'User is required']
   }
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
