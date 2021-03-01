const Event = require('../classes/Event.js')

class Error extends Event {
	
	get name () {
		return 'error'
	}
	
	get once () {
		return false
	}
	
	
	async run (err) {
		return console.error(err)
	}
}

module.exports = Error