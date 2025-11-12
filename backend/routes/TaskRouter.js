const {createTask, fetchAllTasks,updateTaskById,deleteTaskById}=require('../Controllers/TaskController');    
const router =require('express').Router();

// to get all tasks
router.get('/',fetchAllTasks);

//to create a task we need post method 
router.post('/',createTask);

//to update a task
router.put('/:id',updateTaskById);

//to delete a task
router.delete('/:id',deleteTaskById);

module.exports=router;