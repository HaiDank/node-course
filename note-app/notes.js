import fs from 'fs';
import chalk from 'chalk';


const FILE_NAME = 'note.json';

export function getNotes() {}

export function addNote(title, body) {
	const notes = loadNotes();

	const duplicates = notes.filter((note) => note.title === title);

	if (duplicates.length > 0) {
		console.log(chalk.red.inverse('Note already existed'));
		return;
	}

	notes.push({
		title,
		body,
	});

	saveNotes(notes);
}

export function removeNote(title) {
	const notes = loadNotes();
	const editedNotes = notes.filter((note) => note.title !== title);
    if (notes.length > editedNotes.length){
        console.log(chalk.green.inverse('Note removed successfully'))
        saveNotes(editedNotes);
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
    
	return 1;
}

function saveNotes(notes) {
	try {
		const dataJSON = JSON.stringify(notes);
		fs.writeFileSync(FILE_NAME, dataJSON);
	} catch (e) {
		console.log(e);
	}
}

function loadNotes() {
	try {
		const readBuffer = fs.readFileSync(FILE_NAME);
		const data = readBuffer.toString();
		return JSON.parse(data);
	} catch (err) {
		console.log('File not found, creating note.json');
		return [];
	}
}
