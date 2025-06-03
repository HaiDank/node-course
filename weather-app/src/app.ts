import axios from 'axios'
import chalk from 'chalk'
import dotenv from 'dotenv'

dotenv.config()

const instance = axios.create({
	baseURL: `https://api.pirateweather.net/forecast/${process.env.API_KEY}/16.0556, 108.2343?units=si`,
	timeout: 1000,
	headers: { 'X-Custom-Header': 'foobar' },
})

instance
	.get('')
	.then((data) => {
		const currentData = data.data.currently
		const dailyData = data.data.daily
		console.log(dailyData.summary + 
			' It is currently ' +
				chalk.bold.green(currentData.temperature + '°C') +
				' out. There is a ' +
				chalk.bold.green(currentData.precipProbability + '%') +
				' chance of rain.',
		)
	})
	.catch((e) => console.log(chalk.red(e)))
