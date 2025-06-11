import request from 'supertest';
import app from '../app.js';
import { User } from '../models/users.js';
import { setupDatabase, userOne, userOneId } from './fixtures/db.js';

beforeEach(setupDatabase);

test('Should sign up a new user', async () => {
	const response = await request(app)
		.post('/users/sign-up')
		.send({
			name: 'Dank',
			email: 'dang@example.com',
			password: 'test1111',
		})
		.expect(201);

	const user = await User.findById(response.body.user._id);

	expect(user).not.toBeNull();

	expect(response.body).toMatchObject({
		user: {
			name: 'Dank',
			email: 'dang@example.com',
		},
		token: user.tokens[0].token,
	});

	expect(user.password).not.toBe('test1111');
});

test('Should log in an existing user', async () => {
	const response = await request(app)
		.post('/users/login')
		.send({
			email: userOne.email,
			password: userOne.password,
		})
		.expect(200);

	const user = await User.findById(response.body.user._id);

	expect(user).not.toBeNull();

	expect(user.tokens[1].token).toBe(response.body.token);
});

test('Should not log in non-existent user', async () => {
	await request(app)
		.post('/users/login')
		.send({
			email: userOne.email,
			password: '192837198359183',
		})
		.expect(400);
});

test('Should get profile for user', async () => {
	await request(app)
		.get('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);
});

test('Should delete account for user', async () => {
	await request(app)
		.delete('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);

	const user = await User.findById(userOneId);

	expect(user).toBeNull();
});

test('Should delete account for unauthenticated user', async () => {
	await request(app).delete('/users/me').send().expect(401);
});

test('Should upload avatar image', async () => {
	await request(app)
		.post('/users/me/avatar')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.attach('avatar', 'src/tests/fixtures/avatar.png')
		.expect(200);

	const user = await User.findById(userOneId);

	expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			name: 'Dank test update',
			age: 22,
		})
		.expect(200);

	const user = await User.findById(userOneId);

	expect(user.name).toBe('Dank test update');
	expect(user.age).toBe(22);
});

test('Should update invalid user fields', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			rizz: true,
		})
		.expect(400);
});
