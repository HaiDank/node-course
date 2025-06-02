import { hideBin } from 'yargs/helpers';
import { addNote, listNotes, readNote, removeNote } from './notes.js';
import yargs from 'yargs';

const yargsObject = yargs();

yargsObject
	.version('1.0.0')
	.command(
		'add',
		'Add a new note',
		(yargs) => {
			yargs
				.positional('title', {
					type: 'string',
					describe: 'Note title',
				})
				.positional('body', {
					type: 'string',
					describe: 'Note body',
				})
				.demandOption(['body', 'title']);
		},
		function (argv) {
			addNote(argv.title, argv.body);
		}
	)
	.command(
		'remove',
		'Remove a note',
		(yargs) => {
			yargs
				.positional('title', {
					type: 'string',
					describe: 'Note title',
				})
				.demandOption(['title']);
		},
		function (argv) {
			removeNote(argv.title);
		}
	)
	.command(
		'list',
		'List all notes',

		function (argv) {
			listNotes();
		}
	)
	.command(
		'read',
		'Read a note',
		(yargs) => {
			yargs
				.positional('title', {
					type: 'string',
					describe: 'Note title',
				})
				.demandOption(['title']);
		},
		function (argv) {
			readNote(argv.title);
		}
	)
	.help()
	.parse(hideBin(process.argv));
