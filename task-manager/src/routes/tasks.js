import { Router } from 'express';
import { Task } from '../models/tasks.js';
import auth from '../middleware/auth.js';
var router = Router();

/* GET tasks listing. */
router.get('/', auth, async (req, res, next) => {
	try {
		const owner = req.user._id;
		const result = await Task.find({ owner });

		res.status(200).send(result);
	} catch (e) {
		res.status(400).send(e);
	}
});

// GET task by id
router.get('/:id', auth, async (req, res, next) => {
	try {
		const _id = req.params.id;
		const owner = req.user._id;
		const result = await Task.findOne({ _id, owner });

		if (!result) {
			return res.status(404).send('Task not found!');
		}
		res.status(200).send(result);
	} catch (e) {
		res.status(500).send(e);
	}
});

// POST create task
router.post('/', auth, async (req, res) => {
	try {
		const owner = req.user._id
		const task = new Task({...req.body, owner});

		const result = await task.save();

		res.status(201).send(result);
	} catch (e) {
		res.status(400).send(e);
	}
});

// PATCH update task
router.patch('/:id', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedFields = ['description', 'completed'];
	const isValidField = updates.every((update) =>
		allowedFields.includes(update)
	);

	if (!isValidField) {
		return res.status(400).send({ error: 'Invalid field!' });
	}

	try {
		const _id = req.params.id;
		const owner = req.user._id;

		const result = await Task.findOneAndUpdate({ _id, owner }, req.body, {
			new: true,
			runValidators: true,
		});

		if (!result) {
			return res.status(404).send('Task not found!');
		}
		res.status(200).send(result);
	} catch (e) {
		res.status(500).send(e);
	}
});

//DELETE remove a task by id
router.delete('/:id', auth, async (req, res) => {
	try {
		const _id = req.user._id;

		const result = await Task.findOneAndDelete({ _id });

		if (!result) {
			return res.status(404).send('Task not found!');
		}
		res.status(200).send(result);
	} catch (error) {
		res.status(500).send(e);
	}
});

export default router;
