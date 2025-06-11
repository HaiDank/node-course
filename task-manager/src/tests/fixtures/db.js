import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User } from '../../models/users.js';
import { Task } from '../../models/tasks.js';

export const userOneId = new mongoose.Types.ObjectId();
export const userOne = {
	_id: userOneId,
	name: 'Mock Dank',
	email: 'mock.dank@example.com',
	password: '23456789',
	tokens: [
		{
			token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
		},
	],
};

export const userTwoId = new mongoose.Types.ObjectId();
export const userTwo = {
	_id: userTwoId,
	name: 'Mock Dank No. 2',
	email: 'mock.dank.2@example.com',
	password: '23456789123123',
	tokens: [
		{
			token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
		},
	],
};

export const taskOne = {
	_id: new mongoose.Types.ObjectId(),
	description: 'First task',
	owner: userOneId,
};

export const taskTwo = {
	_id: new mongoose.Types.ObjectId(),
	description: 'Second task',
	completed: true,
	owner: userOneId,
};

export const taskThree = {
	_id: new mongoose.Types.ObjectId(),
	description: 'Third task',
	owner: userTwoId,
};

export const setupDatabase = async () => {
	await User.deleteMany();
	await Task.deleteMany();
	await new User(userOne).save();
	await new User(userTwo).save();
	await new Task(taskOne).save();
	await new Task(taskTwo).save();
	await new Task(taskThree).save();
};
