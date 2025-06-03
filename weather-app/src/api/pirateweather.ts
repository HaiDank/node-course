import axios from 'axios'
import chalk from 'chalk'
import dotenv from 'dotenv'

dotenv.config()

const weatherAxios = axios.create({
	baseURL: `https://api.pirateweather.net/forecast/${process.env.API_KEY}`,
	timeout: 1000,
})

export const forecast = async (
	latitude: number,
	longtitude: number,
	callback: (error?: string, data?: string) => void,
) => {
	try {
		const result = await weatherAxios.get(`${latitude},${longtitude}?units=si`)
		const currentData = result.data.currently
		const dailyData = result.data.daily

		callback(
			undefined,
			dailyData.summary +
				' It is currently ' +
				chalk.bold.green(currentData.temperature + '°C') +
				' out. There is a ' +
				chalk.bold.green(currentData.precipProbability + '%') +
				' chance of rain.',
		)
	} catch (e) {
		console.log(chalk.red('Unable to connect to weather web service:: ', e))
	}
}
