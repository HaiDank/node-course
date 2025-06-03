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
	.then((data) => {
		const currentData = data.data.currently
		const dailyData = data.data.daily
		console.log(
			dailyData.summary +
				' It is currently ' +
				chalk.bold.green(currentData.temperature + '°C') +
				' out. There is a ' +
				chalk.bold.green(currentData.precipProbability + '%') +
				' chance of rain.',
		)
	})
	.catch((e) => console.log(chalk.red(e)))

mapboxAxios
	.get('', {
        params: {
            q: 'Los Angeles'
        }
    })
	.then((data) => {{
        console.log('Latitude: ', data.data.features[0].geometry.coordinates[1])
		console.log('Longtitude: ', data.data.features[0].geometry.coordinates[0])
    }
	})
	.catch((e) => console.log(e))
