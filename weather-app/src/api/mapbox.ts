import axios from 'axios'
import chalk from 'chalk'

const mapboxAxios = axios.create({
	baseURL: `https://api.mapbox.com/`,
	timeout: 1000,
})

export const geocode = async (address: string, callback: (error?: string, data?: {
    latitude: number,
    longitude: number,
    location: string
}) => void) => {
	try {
		const url = `search/geocode/v6/forward?access_token=${process.env.MAPBOX_TOKEN}`
		const result = await mapboxAxios.get(url, {
			params: {
				limit: 1,
				q: address,
			},
		})
        const {data} = result
		if (data.features.length > 0) {
            const res = {
                ...data.features[0].properties.coordinates,
                location: data.features[0].properties.full_address
            }
			callback(undefined, res)
		} else {
			callback(chalk.red('Unable to find location'), undefined)
		}
	} catch (e) {
		callback(chalk.red.inverse('ERROR') + chalk.red(' Unable to connect to service:: ', e), undefined)
	}
}
