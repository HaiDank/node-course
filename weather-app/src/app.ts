import axios from 'axios'
import chalk from 'chalk'
import dotenv from 'dotenv'

dotenv.config()

const weatherAxios = axios.create({
	baseURL: `https://api.pirateweather.net/forecast/${process.env.API_KEY}/16.0556, 108.2343?units=si`,
	timeout: 1000,
})

const mapboxAxios = axios.create({
	baseURL: `https://api.mapbox.com/search/geocode/v6/forward?access_token=${process.env.MAPBOX_TOKEN}&limit=1`,
	timeout: 1000,
})

weatherAxios
	.get('')
	.then((res) => {
		// if (res.data.detail) {
		// 	console.log(chalk.red('Unable to find location'))
		// 	return
		// }
		const currentData = res.data.currently
		const dailyData = res.data.daily
		console.log(
			dailyData.summary +
				' It is currently ' +
				chalk.bold.green(currentData.temperature + '°C') +
				' out. There is a ' +
				chalk.bold.green(currentData.precipProbability + '%') +
				' chance of rain.',
		)
	})
	.catch((e) => console.log(chalk.red('Unable to connect to weather web service:: ', e.message)))

mapboxAxios
	.get('', {
		params: {
			q: 'asdawdaw',
		},
	})
	.then((res) => {
		if(res.data.features.length > 0){
			console.log('Latitude: ', res.data.features[0].geometry.coordinates[1])
			console.log('Longtitude: ', res.data.features[0].geometry.coordinates[0])
		} else {
			console.log(chalk.red('Unable to find location'))
			return
        }
	})
	.catch((e) => console.log(chalk.red.inverse('ERROR') + chalk.red('Unable to connect to service:: ', e.message)))
