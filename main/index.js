require('eris-sharder/src/sharding/clustermanager').prototype.printLogo = (...args) => { }
const { Master } = require('eris-sharder')

const { bot } = require('./config/tokens.js')
const { clusterCount, shardCount } = require('./config/settings.js')

const sharder = new Master(bot, '/src/Chip.js', {
	stats: true,
	debug: false,
	clusters: clusterCount,
	shards: shardCount
})

sharder.on('stats', stats => {
	console.log(stats)
})

sharder.on('error', err => console.error(err))