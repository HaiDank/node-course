import { Router } from 'express';
import { Task } from '../models/tasks.js';
var router = Router();

/* GET tasks listing. */
router.get('/', async (req, res, next) => {
	try {
		const result = await Task.find({});

		res.status(200).send(result);
	} catch (e) {
		res.status(400).send(e);
	}
});

// GET task by id
router.get('/:id', async (req, res, next) => {
	try {
		const _id = req.params.id;
		const result = await Task.findById(_id);

		if (!result) {
			return res.status(404).send('Task not found!');
		}
		res.status(200).send(result);
	} catch (e) {
		res.status(500).send(e);
	}
});

//GET get incompleted tasks
router.get('/status/incompleted', async (req, res, next) => {
	try {
		const result = await Task.find({ completed: false });

		const count = await Task.countDocuments({ completed: false });

		res.status(200).send({ tasks: result, count });
	} catch (e) {
		res.status(500).send(e);
	}
});
// POST create task
router.post('', async (req, res) => {
	try {
		const task = new Task(req.body);

		const result = await task.save();

		res.status(201).send(result);
	} catch (e) {
		res.status(400).send(e);
	}
});

// PATCH update task
router.patch('/:id', async (req, res) => {
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

		const result = await Task.findOneAndUpdate({ _id }, req.body, {
			new: true,
			runValidators: true,
		});

		const count = await Task.countDocuments({ completed: false });

		if (!result) {
			return res.status(404).send('Task not found!');
		}
		res.status(200).send({ tasks: result, count });
	} catch (e) {
		res.status(500).send(e);
	}
});

//DELETE remove a task by id
router.delete('/:id', async (req, res) => {
	try {
		const _id = req.params.id;

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
