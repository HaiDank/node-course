import mongoose from 'mongoose'
import validator from 'validator'


const UserSchema = mongoose.Schema({
    name: {
        required: true,
        trim: true,
        type: String,

    },
    email: {
        type: String,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        },
        required: true,
        trim: true
    },
    password: {
        type: String,
        validate(value){

        },
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0
    }
})

export const User = mongoose.model('User', UserSchema)