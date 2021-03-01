const Redis = require('redis')
const { redis } = require('../../config/services.js')

class RedisHandler {
	constructor (bot) {
		this.bot = bot
		
		this.built = false
		this.build()
	}
	
	build () {
		if (this.built) return this
		
		const redisClient = Redis.createClient({
			host: redis.host,
			port: redis.port,
			password: redis.auth
		})
		
		redisClient.on('error', err => {
			console.error(err)
		})
		
		this.bot.redis = redisClient
		this.built = true
		return this
	}
}

module.exports = RedisHandler