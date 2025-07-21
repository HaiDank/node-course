const socket = io();

const $messageForm = document.querySelector('#chat-form');
const $messageButton = document.querySelector('#button');
const $messageInput = document.querySelector('#message');

socket.on('message', (msg) => {
	console.log(msg);
});

$messageForm.addEventListener('submit', (e) => {
	e.preventDefault();

	//disable input and button

	$messageButton.setAttribute('disabled', true);

	const msg = e.target.elements.message.value;

	socket.emit('sendMessage', msg, (error) => {
		// reenable input and button
		$messageButton.removeAttribute('disabled', 'disabled');
		$messageInput.value = '';
		$messageInput.focus();

		if (error) {
			return console.log(error);
		}
		console.log('Message sent!');
	});
});
