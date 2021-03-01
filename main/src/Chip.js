const { Base } = require('eris-sharder')
const { CommandHandler, EventHandler, MongoHandler, RedisHandler } = require('./handlers')
const { embedColor, prefix } = require('../config/settings.js')

class Chip extends Base {
	constructor (client) {
		super(client)
		
		this.bot.location = process.cwd()
		this.bot.color = embedColor
		this.bot.mongo = new MongoHandler()
		this.bot.redis = new RedisHandler(this.bot)
		
		new CommandHandler(this.bot)
		new EventHandler(this.bot)
	}
	
	async launch () {
		this.bot.editStatus('online', { name: `${prefix}help`, type: 2 })
	}
}

module.exports = Chip