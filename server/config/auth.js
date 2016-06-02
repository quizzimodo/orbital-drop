module.exports = {
	dev: {
        clientID: 'fdc419f43731fc28b60f',
        clientSecret: 'dca61a389248fba85659c295a19ec6bc4c77aa2b',
        callbackURL: 'http://127.0.0.1:8008/login/github/callback'
	},
    prod: {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CLIENT_URL
    }
}   
    