const nanoid = require('nanoid')

const Session = require('../models/session.model')

module.exports.create = (req, res, next) => {
	if (!req.signedCookies.sessionId) {
		const sessionId = nanoid()
		res.cookie('sessionId', sessionId, { signed: true })
		const session = new Session({
			id: sessionId
		})

		session.save().then(() => next())
	}
	next()
}

module.exports.totalProducts = async (req, res, next) => {
	const sessionId = req.signedCookies.sessionId
	var session;
	await Session
		.findOne({ id: sessionId })
		.then(result => session = result)
	var total = 0
	if (session.cart !== null) {
		session.cart.forEach(product => total += product.count)
	}
	
	res.locals.total = total

	next()
}