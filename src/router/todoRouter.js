import express from 'express';
import TaskController from '../controller/todoController.js';



const router = express.Router();


router
.route('/')
.post(TaskController.createTask)

router
.route('/')
.get(TaskController.getAllTasks)




router
.route('/:id')
.get(TaskController.getOneTask)


router
.route('/:id')
.patch(TaskController.updateOneTask)



router
.route('/:id')
.delete(TaskController.deleteOneTask)

// Add the prefix to all routes
const prefix = '/api/v1/tasks';
router.use(prefix, router);


export default router;