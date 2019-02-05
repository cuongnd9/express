const nanoid = require('nanoid')

const db = require('../db')

module.exports.create = (req, res, next) => {
	if (!req.signedCookies.sessionId) {
		const sessionId = nanoid()
		res.cookie('sessionId', sessionId, { signed: true })
		db.get('sessions').push({ 
			id: sessionId 
		}).write()
	}

	next()
}

module.exports.totalProducts = (req, res, next) => {
	const sessionId = req.signedCookies.sessionId
	let session = db
		.get('sessions')
		.find({ id: sessionId })
		.value()
	let products = (typeof session !== 'undefined') ? session.cart : null
	var total = 0
	for (var idProduct in products) {
		total += products[idProduct]
	}
	res.locals.total = total

	next()
}