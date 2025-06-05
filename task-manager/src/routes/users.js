import { Router } from 'express';
import { User } from '../models/users.js';
var router = Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
	try {
		const result = await User.find({});

		res.status(200).send(result);
	} catch (e) {
		res.status(400).send(e);
	}
});

// GET user by id
router.get('/:id', async (req, res, next) => {
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

//POST login user
router.post('/login', async(req,res) => {
  try {
    const {email, password} = req.body
    const user = await User.findByCredentials(email, password)
    res.send(user)
  } catch (error) {
    res.status(404).send(e)
  }

})

// POST create user
router.post('', async (req, res) => {
	try {
		const user = new User(req.body);

		const result = await user.save();

		res.status(201).send(result);
	} catch (e) {
		res.status(400).send(e);
	}
});

// PATCH update user
router.patch('/:id', async (req, res) => {
	try {
		const updates = Object.keys(req.body);
		const allowedFields = ['name', 'email', 'password', 'age'];
		const isValidField = updates.every((update) =>
			allowedFields.includes(update)
		);

		if (!isValidField) {
			return res.status(400).send({ error: 'Invalid field!' });
		}

		const _id = req.params.id;
		const user = await User.findById(_id);

		updates.forEach((update) => {
			user[update] = req.body[update];
		});

		await user.save();

		// const result = await User.findByIdAndUpdate(_id, req.body, {
		// 	new: true,
		// 	runValidators: true,
		// });

		if (!user) {
			return res.status(404).send();
		}

		res.status(200).send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

//DELETE remove a user by id
router.delete('/:id', async (req, res) => {
	try {
		const _id = req.params.id;

		const result = await User.findOneAndDelete({ _id });

		if (!result) {
			return res.status(404).send('User not found!');
		}
		res.status(200).send(result);
	} catch (error) {
		res.status(500).send(e);
	}
});

export default router;
