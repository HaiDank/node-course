import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
    }
})

export const Task = mongoose.model('Task', TaskSchema)