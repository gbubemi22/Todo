import Task from "../model/Todo.js";

const taskRepository = {
  // Create a new task
  createTask: async (title, description, user) => {
    try {
      const newTask = new Task({
        title,
        description,
        user,
      });

      await newTask.save();
      return newTask;
    } catch (error) {
      throw new Error("Error creating task");
    }
  },

  // Get all tasks
  getAllTasks: async () => {
    try {
      const tasks = await Task.find();
      return tasks;
    } catch (error) {
      throw new Error("Error fetching tasks");
    }
  },

  // Get a single task by ID
  getTaskById: async (taskId) => {
    try {
      const task = await Task.findById(taskId);
      return task;
    } catch (error) {
      throw new Error("Error fetching task");
    }
  },

  // Update a task
  updateTask: async (taskId, updateData) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
        new: true,
      });
      return updatedTask;
    } catch (error) {
      throw new Error("Error updating task");
    }
  },

  // Delete a task
  deleteTask: async (taskId) => {
    try {
      const deletedTask = await Task.findByIdAndDelete(taskId);
      return deletedTask;
    } catch (error) {
      throw new Error("Error deleting task");
    }
  },
};

export default taskRepository;



