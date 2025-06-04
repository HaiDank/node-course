// @ts-nocheck

const weatherInput = document.querySelector('#weather-address')

weatherInput.addEventListener('submit', (e) => {
	e.preventDefault()
	const address = document.querySelector('#address').value
	console.log(address)
	if (address) {
		const div = document.querySelector('#display')
		console.log(div)
		fetch(`http://localhost:3000/weather?address=${address}`).then((res) => {
			console.log('Fetching')
			res.json().then((data) => {
				div.innerHTML = `
				<p class="text-xl font-bold">
				${data.location}
				</p>
				<span> ${data.forecast.summary} It is currently
			</span>
			<span class='font-medium text-green-600'>
				${data.forecast.temp}
				°C
			</span>
			<span>
				out. There is a
			</span>
			<span class='font-bold text-green-600'>
				${data.forecast.rainPercent}%
			</span>
			<span>
				chance of rain.
			</span>`
			})
		})
	}
})
