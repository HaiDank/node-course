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

router.post('', (req, res) => {
	const user = new User(req.body);

	user.save()
		.then(() => {
			res.status(201).send(user);
		})
		.catch((e) => console.log(e));
});

export default router;
