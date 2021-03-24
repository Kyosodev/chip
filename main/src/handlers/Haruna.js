const fetch = require('node-fetch')
const abort = require('abort-controller')

class Haruna {
	constructor (url, auth) {
		this.url = url
		Object.defineProperty(this, 'auth', {
			value: auth
		})
	}
	
	getVote (user_id) {
		if (!user_id) throw new Error('No user_id specified.')
		return this._fetch('/voteInfo', user_id)
	}
	
	getStats () {
		return this._fetch('/stats')
	}
	
	_fetch (endpoint, user_id) {
		const url = new URL(this.url + endpoint)
		if (user_id) url.search = new URLSearchParams({ user_id })
		
		const controller = new abort()
		const timeout = setTimeout(() => controller.abort(), 20000)
		
		return fetch(url.toString(), {
			headers: {
				'authorization': this.auth
			},
			signal: controller.signal
		})
			.then((res) => {
				if (res.status !== 200) throw new Error(`Status Code: ${res.status}`)
				return res.json()
			})
			.finally(() => clearTimeout(timeout))
	}
}

module.exports = Haruna