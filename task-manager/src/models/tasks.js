import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

export const Task = mongoose.model('Task', TaskSchema)