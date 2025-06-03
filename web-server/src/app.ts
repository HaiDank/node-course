import chalk from 'chalk'
import express, { Request, Response } from 'express'
import { create } from 'express-handlebars'
import path from 'path'

const app = express()
const hbs = create({ partialsDir: ['./views/partials/'] })

app.use(express.static(path.join(__dirname, '../public')))

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('', (req: Request, res: Response) => {
	res.render('index', {
		title: 'Home',
	})
})

app.get('/help', (req: Request, res: Response) => {
	res.render('help', {
		title: 'Help',
	})
})

app.get('/about', (req: Request, res: Response) => {
	res.render('about', {
		title: 'About page',
		name: 'Dank',
		age: 22,
	})
})

app.get('/weather', (req: Request, res: Response) => {
	res.render('weather', {
		title: 'Weather',
		forecast: 'test',
		location: 'test',
	})
})

app.get('/help/{*any}', (req: Request, res: Response) => {
	res.render('help-404')
})

app.get('/{*any}', (req: Request, res: Response) => {
	res.render('404')
})

app.listen(3000, () => {
	console.log(path.join(__dirname, '../public'))
	console.log('Server is up on port: ' + chalk.bold.yellow('http://localhost:3000'))
})
