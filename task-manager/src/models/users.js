import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Task } from './tasks.js';
import 'dotenv/config';

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
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid');
			}
		},
		required: true,
		trim: true,
	},
	password: {
		type: String,
		validate(value) {
			if (value.length <= 6) {
				throw new Error('password is too short');
			}
		},
		required: true,
		trim: true,
	},
	age: {
		type: Number,
		default: 0,
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

UserSchema.virtual('tasks', {
	ref: 'Task',
	localField: '_id',
	foreignField: 'owner',
});

UserSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

UserSchema.pre(
	'deleteOne',
	{ document: true, query: false },
	async function (next) {
		const user = this;

		await Task.deleteMany({ owner: user._id });

		next();
	}
);

UserSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('Unable to login');
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error('Unable to login');
	}
	return user;
};

UserSchema.method('generateAuthToken', async function () {
	const user = this;
	const token = jwt.sign(
		{ _id: user._id.toString() },
		process.env.JWT_SECRET
	);

	user.tokens.push({ token });
	await user.save();
	return token;
});

UserSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

export const User = mongoose.model('User', UserSchema);
