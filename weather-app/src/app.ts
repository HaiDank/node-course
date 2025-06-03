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
		if (error) {
			console.log(error)
			return
		}

		const { latitude, longitude, location } = data!
		console.log(chalk.bold.yellow(location))

		forecast(latitude, longitude, (error, data) => {
			console.log(data)
		})
	})
}
