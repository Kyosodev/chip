const EventEmitter = require('events')

class Event extends EventEmitter {
	constructor (bot) {
		super()
		this.bot = bot
		
		if (this.constructor === Event) throw new TypeError('Abstract class "Event" cannot be instantiated directly')
		if (this.name === undefined) throw new TypeError('Classes extending "Event" must have a getter "name"')
		if (this.once === undefined) throw new TypeError('Classes extending "Event" must have a getter "once"')
		if (this.run !== undefined) {
			if (this.run.constructor.name !== 'AsyncFunction')
				throw new TypeError('Classes extending "Event" must implement "run" as async function')
		} else throw new TypeError('Classes extending "Event" must implement an async function "run"')
		
		this.on('error', (err) => console.error(err))
	}
	
	exec (...args) {
		this.run(...args).catch(err => this.emit('error', err))
	}
}

module.exports = Event