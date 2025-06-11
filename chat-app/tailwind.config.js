//tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./public/*.{html}',
		'./views/**/*.{js,ts,jsx,tsx, handlebars}',
		'./views/*.{js,ts,jsx,tsx, handlebars}',
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
