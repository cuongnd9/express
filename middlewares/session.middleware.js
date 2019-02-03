const nanoid = require('nanoid')

const db = require('../db')

module.exports = (req, res, next) => {
	if (!req.signedCookies.sessionId) {
		const sessionId = nanoid()
		res.cookie('sessionId', sessionId, { signed: true })
		db.get('sessions').push({ 
			id: sessionId 
		}).write()
	}

	next()
}