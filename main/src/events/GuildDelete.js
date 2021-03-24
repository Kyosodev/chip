const Event = require('../classes/Event.js')

class GuildDelete extends Event {
	
	get name () {
		return 'guildDelete'
	}
	
	get once () {
		return false
	}
	
	
	async run (guild) {
		const guildData = await this.bot.db.getGuild(guild.id)
		await guildData.delete()
		
		const playerData = await this.bot.db.getPlayer(guild.id)
		return await playerData.delete()
	}
}

module.exports = GuildDelete