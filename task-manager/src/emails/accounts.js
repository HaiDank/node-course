import sgMail from '@sendgrid/mail';
import 'dotenv/config';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendWelcomeEmail = (email, name) => {
	const msg = {
		to: email,
		from: 'danevil2003@gmail.com', // Use the email address or domain you verified above
		subject: 'Welcome to Task Manager',
		text: `Welcome ${name}`,
		html: `<strong>Welcome ${name}</strong>`,
	};

    sgMail.send(msg)
};

export const sendGoodbyeEmail = (email, name) => {
    const msg = {
		to: email,
		from: 'danevil2003@gmail.com', // Use the email address or domain you verified above
		subject: 'Task Manager is sorry to see you go.',
		text: ` ${name}`,
		html: `<strong> ${name}</strong>`,
	};

    sgMail.send(msg)
}
