import chalk from 'chalk'
import express, { Request, Response } from 'express'
import { create } from 'express-handlebars'
import path from 'path'
import { geocode } from './api/mapbox'
import { forecast } from './api/pirateweather'

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

app.get('/weather', async (req: Request, res: Response) => {
	const { address } = req.query

	const geoResult = await geocode(address)

	if (typeof geoResult === 'string') {
		res.render('weather', {
			title: 'Weather',
			error: geoResult,
		})
	} else {
		const forecastResult = await forecast(geoResult.latitude, geoResult.longitude)
		if (forecastResult.forecast) {
			res.render('weather', {
				title: 'Weather',
				forecast: forecastResult.forecast,
				location: geoResult.location,
			})
		} else {
			res.render('weather', {
				title: 'Weather',
				error: forecastResult.errorMessage,
			})
		}
	}
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
