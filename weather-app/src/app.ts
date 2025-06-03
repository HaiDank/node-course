import dotenv from 'dotenv'
import { geocode } from './api/mapbox'
import { forecast } from './api/pirateweather'
import chalk from 'chalk'
dotenv.config()

const place = process.argv[2]

if (!place) {
	console.log(chalk.red('Please provide an address'))
} else {
	geocode(place, (error, data) => {
		console.log(error)
		if (data) {
			forecast(data.latitude, data.longitude, (error, data) => {
				console.log(data)
			})
		}
	})
}
