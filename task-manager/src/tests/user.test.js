import request from 'supertest';
import app from '../app.js';
import { User} from '../models/users.js';


const userOne = {
    name: 'Mock Dank',
    email: 'mock.dank@example.com',
    password: '23456789'
}

beforeEach(async ()=>{
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should sign up a new user', async () => {
	await request(app)
		.post('/users/sign-up')
		.send({
			name: 'Dank',
			email: 'dang@example.com',
			password: 'test1111',
		})
		.expect(201);
});

test('Should log in an existing user', async () => {
	await request(app)
		.post('/users/login')
		.send({
			email: userOne.email,
			password: userOne.password,
		})
		.expect(200);
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