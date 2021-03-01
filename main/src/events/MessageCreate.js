const Event = require('../classes/Event.js')
const { owners } = require('../../config/settings.js')

class MessageCreate extends Event {
	
	get name () {
		return 'messageCreate'
	}
	
	get once () {
		return false
	}
	
	_checkPerms (msg, perms) {
		if (!Array.isArray(perms)) perms = [perms]
		if (perms.includes('OWNER')) return owners.includes(msg.author.id)
	}
	
	async run (msg) {
		try {
			if (msg.author.bot || msg.channel.type !== 0 || !msg.channel.guild) return
			
			if (!msg.channel.permissionsOf(this.bot.user.id).has('sendMessages')) return
			if (!msg.channel.permissionsOf(this.bot.user.id).has('embedLinks')) return
			
			const guildData = await this.bot.mongo.getGuild(msg.channel.guild.id)
			const prefix = guildData?.serverPrefix.toLowerCase()
			
			const regularMention = msg.content.startsWith(`<@${this.bot.user.id}>`)
			const isMentioningBot = (regularMention || msg.content.startsWith(`<@!${this.bot.user.id}>`))
			const mentionString = regularMention ? `<@${this.bot.user.id}>` : `<@!${this.bot.user.id}>`
			const usedPrefix = isMentioningBot ? mentionString : prefix
			
			if (!msg.content.toLowerCase().startsWith(usedPrefix)) return
			
			const args = msg.content.slice(usedPrefix.length).trim().split(/ +/g)
			let command = args.shift().toLowerCase()
			
			if (!msg.content.startsWith(prefix)) {
				if (isMentioningBot && !command) {
					let lastLetter = prefix.split('')[prefix.length - 1]
					
					await msg.channel.createMessage({
						embed: {
							author: {
								name: `|  My prefix is ${prefix}, to get started send ${lastLetter.match(/[a-z]/g) ? prefix + ' help' : prefix + 'help'}`,
								icon_url: msg.author.avatarURL
							},
							color: this.bot.color
						}
					})
				}
			}
			
			if (!this.bot.commands.has(command)) return
			command = this.bot.commands.get(command)
			if (command.permissions && !this._checkPerms(msg, command.permissions)) return
			
			return await command.run(msg, args)
		} catch (err) {
			this.emit('error', err)
		}
	}
}

module.exports = MessageCreate