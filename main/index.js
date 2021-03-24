require('eris-sharder/src/sharding/clustermanager').prototype.printLogo = (...args) => { }
const { Master } = require('eris-sharder')

const { bot } = require('./config').tokens
const { clusterCount, shardCount } = require('./config').settings

const MasterProcess = new Master(bot, '/src/Chip.js', {
	stats: false,
	debug: false,
	clusters: clusterCount,
	shards: shardCount
})

MasterProcess.on('stats', stats => {
	console.log(stats)
})

MasterProcess.on('error', err => console.error(err))