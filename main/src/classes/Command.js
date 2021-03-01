class Command {
	constructor (bot) {
		this.bot = bot
		
		if (this.constructor === Command) throw new TypeError('Abstract class "Command" cannot be instantiated directly')
		if (this.name === undefined) throw new TypeError('Classes extending "Command" must have a getter "name"')
		if (this.aliases === undefined) throw new TypeError('Classes extending "Command" must have a getter "aliases"')
		if (this.run !== undefined) {
			if (this.run.constructor.name !== 'AsyncFunction')
				throw new TypeError('Classes extending "Command" must implement "run" as async function')
		} else throw new TypeError('Classes extending "Command" must implement an async function "run"')
	}
	
	get permissions () {
		return null
	}
}

module.exports = Command