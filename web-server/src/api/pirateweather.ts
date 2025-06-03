import axios from 'axios'
import chalk from 'chalk'
import dotenv from 'dotenv'

dotenv.config()

const weatherAxios = axios.create({
	baseURL: `https://api.pirateweather.net/forecast/${process.env.API_KEY}`,
	timeout: 1000,
})

type ForecastData = {
	forecast?: {
		summary: string
		temp: number
		rainPercent: number
	}
	errorMessage?: string
}

export const forecast = async (latitude: number, longtitude: number): Promise<ForecastData> => {
	try {
		const result = await weatherAxios.get(`${latitude},${longtitude}?units=si`)
		const currentData = result.data.currently
		const dailyData = result.data.daily

		return {
			forecast: {
				summary: dailyData.summary,
				temp: currentData.temperature,
				rainPercent: currentData.precipProbability,
			},
		}
	} catch (e) {
		console.log(chalk.red('Unable to connect to weather web service:: ', e))
		return { errorMessage: 'Unable to connect to weather web service' }
	}
}
