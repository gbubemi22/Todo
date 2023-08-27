import { StatusCodes } from "http-status-codes";
import taskRepository from '../respository/todoRepository.js';
import NotFoundError from "../errors/not-found.js";

const TaskController = {

     createTask: async (req, res) => {
          try {
            const { title, description, user } = req.body;
      
            const newTask = await taskRepository.createTask(title, description, user);
      
            return res.status(StatusCodes.CREATED).json({
              message: "Task created successfully",
              task: newTask,
            });
          } catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              message: "Error creating task",
              error: error.message,
            });
          }
        },

        getAllTasks: async (req, res) => {
          try {

               const tasks = await taskRepository.getAllTasks()

               if(!tasks || tasks.length === 0) {
                 throw new NotFoundError(`tasks not found`)
               }

               return res.status(StatusCodes.OK).json({
                    message: true,
                    count: tasks.length,
                    data: tasks
               })
               
          } catch (error) {
               console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              message: "Error fetching tasks",
              error: error.message,
            }); 
          }
        },
        getOneTask: async (req, res) => {
          try {
            const taskId = req.params.id;
            const task = await taskRepository.getTaskById(taskId);
      
            if (!task) {
              throw new NotFoundError(`Task with ID ${taskId} not found`);
            }
      
            return res.status(StatusCodes.OK).json({
              message: true,
              data: task,
            });
          } catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              message: "Error fetching task",
              error: error.message,
            });
          }
        },
      
        updateOneTask: async (req, res) => {
          try {
            const taskId = req.params.id;
            const { title, description, completed } = req.body;
            const updatedTask = await taskRepository.updateTask(taskId, {
              title,
              description,
              completed,
            });
      
            if (!updatedTask) {
              throw new NotFoundError(`Task with ID ${taskId} not found`);
            }
      
            return res.status(StatusCodes.OK).json({
              message: "Task updated successfully",
              data: updatedTask,
            });
          } catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              message: "Error updating task",
              error: error.message,
            });
          }
        },
      
        deleteOneTask: async (req, res) => {
          try {
            const taskId = req.params.id;
            const deletedTask = await taskRepository.deleteTask(taskId);
      
            if (!deletedTask) {
              throw new NotFoundError(`Task with ID ${taskId} not found`);
            }
      
            return res.status(StatusCodes.OK).json({
              message: "Task deleted successfully",
            });
          } catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              message: "Error deleting task",
              error: error.message,
            });
          }
        },
}


export default TaskController;