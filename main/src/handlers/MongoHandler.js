const Mongo = require('mongoose')
const Schema = Mongo.Schema
const { prefix, mongoUser } = require('../../config/settings.js')
const { mongo } = require('../../config/services.js')

class MongoHandler {
	constructor () {
		this.mongo = Mongo
		this.init().catch((e) => console.error(e))
		this.schemas = {
			Guild: new Schema({
				_id: String,
				serverPrefix: { type: String, default: prefix }
			}),
			
			Player: new Schema({
				_id: String,
				loop: { type: String, default: 'Off' },
				defaultVolume: { type: Number, default: 100 },
				dispatcher: { type: Object, default: null }
			}),
			
			Premium: new Schema({
				_id: String,
				userPremium: { type: Array, default: [] },
				serverPremium: { type: Array, default: [] },
				contributors: { type: Array, default: [] }
			})
		}
		
		this.models = {
			Guild: Mongo.model('guild', this.schemas.Guild),
			Player: Mongo.model('player', this.schemas.Player),
			Premium: Mongo.model('premium', this.schemas.Premium)
		}
	}
	
	async getGuild (id) {
		const guildDoc = await this.models.Guild.findById(`${mongoUser}_guilddata_${id}`)
		if (!guildDoc) {
			const newGuild = new this.models.Guild({
				_id: `${mongoUser}_guilddata_${id}`
			})
			await newGuild.save()
			return newGuild
		} else return guildDoc
	}
	
	async getPlayer (id) {
		const playerDoc = await this.models.Player.findById(`${mongoUser}_playerdata_${id}`)
		if (!playerDoc) {
			const newPlayer = new this.models.Player({
				_id: `${mongoUser}_playerdata_${id}`
			})
			await newPlayer.save()
			return newPlayer
		} else return playerDoc
	}
	
	async getPremium (id) {
		const premiumDoc = await this.models.Premium.findById(`global_premiumdata_${id}`)
		if (!premiumDoc) {
			const newPremium = new this.models.Premium({
				_id: `global_premiumdata_${id}`
			})
			await newPremium.save()
			return newPremium
		} else return premiumDoc
	}
	
	async init () {
		await this.mongo.connect(mongo.host, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			authSource: mongo.authSource,
			auth: {
				user: mongo.auth.user,
				password: mongo.auth.password
			}
		})
	}
}

module.exports = MongoHandler
