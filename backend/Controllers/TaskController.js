const TaskModel = require("../Models/TaskModel");

const createTask=async (req,res)=>{
    const data=req.body;
    try{
        const model=new TaskModel(data);
        await model.save();
        res.status(201)
        .json({message:"task created successfully",success:true});
    }catch(err){
            res.status(500).json({message:"failed in creating task",success:false});
        }
    }

    const fetchAllTasks=async (req,res)=>{
        try{
            const data=await TaskModel.find({});
            res.status(200)
            .json({message:"All Tasks",success:true,data});
        }catch(err){
                res.status(500).json({message:"failed in get all tasks",success:false});
            }
        }

        const updateTaskById=async (req,res)=>{
            try{
                const id=req.params.id;
                const body=req.body;
                const obj={$set:{...body}};
                await TaskModel.findByIdAndUpdate(id,obj);
                res.status(200)
                .json({message:"Task updated",success:true});
            }catch(err){
                    res.status(500).json({message:"failed in update task",success:false});
                }
            }

            const deleteTaskById=async (req,res)=>{
                try {
                    const id = req.params.id;
                    await TaskModel.findByIdAndDelete(id);
                    res.status(200)
                        .json({ message: 'Task is deleted', success: true });
                } catch (err) {
                    res.status(500).json({ message: 'Failed to delete task', success: false });
                }
                }
    
    module.exports={
        createTask,
        fetchAllTasks,
        updateTaskById,
        deleteTaskById
    };
    