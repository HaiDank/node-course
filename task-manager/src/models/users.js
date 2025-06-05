import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'


const UserSchema = new mongoose.Schema({
    name: {
        required: true,
        trim: true,
        type: String,

    },
    email: {
        type: String,
        unique: true,
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

UserSchema.pre('save', async function(next){
    const user = this
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

export const User = mongoose.model('User', UserSchema)