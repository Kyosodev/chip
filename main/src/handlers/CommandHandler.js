const { readdirSync } = require('fs')
const EventEmitter = require('events')

class CommandHandler extends EventEmitter {
	constructor (bot) {
		super()
		this.bot = bot
		this.commands = new Map()
		
		this.built = false
		this.build()
	}
	
	build () {
		if (this.built) return this
		
		const commands = readdirSync(this.bot.location + '/src/commands')
		for (let command of commands) {
			command = new (require(`../commands/${command}`))(this.bot)
			command.aliases.forEach((alias) => {
				this.commands.set(alias, command)
			})
			this.commands.set(command.name, command)
		}
		
		this.bot.commands = this.commands
		this.built = true
		return this
	}
}

module.exports = CommandHandler