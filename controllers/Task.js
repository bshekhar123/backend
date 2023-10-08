import ErrorHandler from "../middlewares/Error.js";
import { Task } from "../models/Task.js"

export const newTask = async (req, res, next) => {
    const { title, description } = req.body;

    await Task.create({
        title,
        description,
        user: req.user,
    })

    res.status(201).json({
        success: true,
        message: 'Task created successfully'
    })
}



export const getMyTask = async (req, res, next) => {
    const userid = req.user._id;

    const tasks = await Task.find({ user: userid })

    res.status(201).json({
        success: true,
        tasks,
    })
}


export const updateTask = async (req, res, next) => {


    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Task not found", 404));

    task.isCOmpleted = !task.isCOmpleted

    await task.save();
   

    res.status(200).json({
        success: true,
        message: "task updated!"
    })
}


export const deleteTask = async (req, res, next) => {

    const task = await Task.findById(req.params.id);

    if (!task)
        return next(new ErrorHandler("task not found", 404));
    await task.deleteOne();

    res.status(200).json({
        success: true,
        message: "task deleted!"

    })

}