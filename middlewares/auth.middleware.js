const User = require('../models/user.model')

module.exports.requireAuth = async (req, res, next) => {
	if (!req.signedCookies.userId) {
		res.redirect('/auth/login')
		return;
	}

	var user
	await User
		.findById(req.signedCookies.userId)
		.then(result => user = result)

	if (!user) {
		res.redirect('/auth/login')
		return;
	}

	next()
}