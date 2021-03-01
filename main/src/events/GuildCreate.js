const Event = require('../classes/Event.js')

class GuildCreate extends Event {
	
	get name () {
		return 'guildCreate'
	}
	
	get once () {
		return false
	}
	
	
	async run (guild) {
		const guildData = await this.bot.db.getGuild(guild.id)
		await guildData?.delete()
		
		const playerData = await this.bot.db.getPlayer(guild.id)
		return await playerData?.delete()
	}
}

module.exports = GuildCreate