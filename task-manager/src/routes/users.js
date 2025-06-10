import { Router } from 'express';
import { User } from '../models/users.js';
import auth from '../middleware/auth.js';
import multer from 'multer';
import sharp from 'sharp';
import { sendGoodbyeEmail, sendWelcomeEmail } from '../emails/accounts.js';

const storage = multer.memoryStorage();

const upload = multer({
	dest: 'avatars',
	limits: 5000000,
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpeg|png|jpg)$/)) {
			return cb(new Error('Please upload an image'));
		}
		cb(undefined, true);
	},
	storage,
}); //5MB

var router = Router();

/* GET users listing. */
router.get('/me', auth, async function (req, res, next) {
	try {
		res.send(req.user);
	} catch (e) {
		res.status(400).send(e);
	}
});

// GET user by id
router.get('/:id', auth, async (req, res, next) => {
	try {
		const _id = req.params.id;
		const result = await User.findById(_id);

		if (!result) {
			return res.status(404).send('User not found!');
		}
		res.status(200).send(result);
	} catch (e) {
		res.status(500).send(e);
	}
});

// GET get avatar
router.get('/me/avatar', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		res.set('Content-Type', 'image/png');
		res.send(user.avatar);
	} catch (e) {
		res.status(400).send(e);
		console.log(e);
	}
});

//POST login user
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findByCredentials(email, password);

		if (!user) {
			res.status(404).send(e);
			console.log(e);
		}

		const token = await user.generateAuthToken();
		res.send({
			user: user,
			token,
		});
	} catch (e) {
		res.status(400).send(e);
		console.log(e);
	}
});

// POST upload avatar
router.post('/me/avatar', auth, upload.single('avatar'), async (req, res) => {
	try {
		const buffer = await sharp(req.file.buffer)
			.resize({ width: 250, height: 250 })
			.png()
			.toBuffer();

		req.user.avatar = buffer;

		await req.user.save();
		res.send('Upload successfully');
	} catch (e) {
		res.status(400).send(e);
		console.log(e);
	}
});

// POST create user
router.post('/sign-up', async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();

		sendWelcomeEmail(user.email, user.name);

		const token = await user.generateAuthToken();
		res.status(201).send({
			user,
			token,
		});
	} catch (e) {
		res.status(400).send(e);
		console.log(e);
	}
});

//POST logout
router.post('/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(
			(token) => token.token !== req.token
		);
		await req.user.save();
		res.send('Logout successfully');
	} catch (error) {
		res.status(500).send();
	}
});

//POST logout all
router.post('/logout-all', auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send('Logout successfully');
	} catch (error) {
		res.status(500).send();
	}
});

// PATCH update user
router.patch('/me', auth, async (req, res) => {
	try {
		//check if body contain invalid field
		const updates = Object.keys(req.body);
		const allowedFields = ['name', 'email', 'password', 'age'];
		const isValidField = updates.every((update) =>
			allowedFields.includes(update)
		);

		if (!isValidField) {
			return res.status(400).send({ error: 'Invalid field!' });
		}

		// find user and update
		const user = req.user;

		updates.forEach((update) => {
			user[update] = req.body[update];
		});

		await user.save();

		res.status(200).send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

//DELETE remove a user by id
router.delete('/me', auth, async (req, res) => {
	try {
		// const result = await User.findOneAndDelete({ _id });

		// if (!result) {
		// 	return res.status(404).send('User not found!');
		// }

		const result = await req.user.deleteOne();

		sendGoodbyeEmail(req.user.email, req.user.name);

		res.status(200).send(req.user);
	} catch (error) {
		res.status(500).send(error);
	}
});

export default router;
