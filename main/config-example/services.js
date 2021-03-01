module.exports = {
	redis: {
		host: '', // Your Redis instance's IP
		auth: '', // Your Redis instance's password
		port: 0 // Your Redis instance's port
	},
	mongo: {
		host: '', // Your MongoDB connection string + database (example: mongodb://0.0.0.0:3000/database)
		auth: {
			user: '', // Your MongoDB user
			password: '' // Your MongoDB password
		},
	}
}
