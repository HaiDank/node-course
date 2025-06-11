import {
	setupDatabase,
	taskOne,
	userOne,
	userOneId,
	userTwo,
} from './fixtures/db.js';
import request from 'supertest';
import app from '../app.js';
import { Task } from '../models/tasks.js';

beforeEach(setupDatabase);

test('Should create task for user', async () => {
	const response = await request(app)
		.post('/tasks')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			description: 'Test case for jest 2',
		})
		.expect(201);

	const task = await Task.findById(response.body._id);
	expect(task).not.toBeNull();
});

test('Should get tasks for user', async () => {
	const response = await request(app)
		.get('/tasks')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.expect(200);

	expect(response.body.tasks.length).toBe(2);
	expect(response.body.count).toBe(2);
});

test('Should delete task for unauthorized user', async () => {
	const response = await request(app)
		.delete(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
		.expect(404);

	const task = await Task.findById(taskOne._id);
	expect(task).not.toBeNull();
});

test('Should fetch incompleted tasks for user', async () => {
	const response = await request(app)
		.get(`/tasks?completed=false`)
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.expect(200);

        console.log(response.body)
	expect(response.body.tasks.length).toBeGreaterThan(0);
	response.body.tasks.forEach((task) => {
		expect(task.completed).toEqual(false);
	});
});
