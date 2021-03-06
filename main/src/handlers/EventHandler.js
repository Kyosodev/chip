const { readdirSync } = require('fs')

class EventHandler {
	constructor (bot) {
		this.bot = bot
		this.events = new Map()
		
		this.built = false
		this.build()
	}
	
	build () {
		if (this.built) return this
		
		const events = readdirSync(this.bot.location + '/src/events')
		for (let event of events) {
			event = new (require(`../events/${event}`))(this.bot)
			const exec = event.exec.bind(event)
			event.once ? this.bot.once(event.name, exec) : this.bot.on(event.name, exec)
			this.events.set(event.name, event)
		}
		
		this.bot.events = this.events
		this.built = true
		return this
	}
}

module.exports = EventHandler