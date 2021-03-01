const Command = require('../classes/Command.js')
const util = require('util')

class Eval extends Command {
	get name () {
		return 'eval'
	}
	
	get aliases () {
		return ['eval', 'ev']
	}
	
	get permissions () {
		return 'OWNER'
	}
	
	trim (string, max) {
		return string.length > max ? string.slice(0, max) : string
	}
	
	async run (msg, args) {
		let res
		try {
			res = await eval(args.join(' '))
			res = util.inspect(res, { depth: 0 })
		} catch (error) {
			res = util.inspect(error, { depth: 0 })
		}
		
		return await msg.channel.createMessage({
			embed: {
				author: {
					name: `|  Output`,
					icon_url: msg.author.avatarURL
				},
				description: `\`\`\`js\n${this.trim(res, 2000)}\`\`\``,
				color: this.bot.color
			}
		})
	}
}

module.exports = Eval