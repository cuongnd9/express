const bcrypt = require('bcrypt')

const User = require('../models/user.model')

module.exports.login = (req, res) => {
	res.render('auth/login', { title: 'Login' })
}

module.exports.postLogin = async (req, res) => {
	var { email, password } = req.body

	var user
	await User
		.findOne({ email: email })
		.then(result => user = result)

	if (!user) {
		res.render('auth/login', {
			title: 'Login',
			errors: [
				'User does not exists.'
			],
			values: req.body
		})
		return;
	}

	bcrypt.compare(password, user.password, (err, result) => {
		if (!result) {
			res.render('auth/login', {
				title: 'Login',
				errors: [
					'Wrong password.'
				],
				values: req.body
			})
		return;
		}

		res.cookie('userId', user.id, { signed: true })
		res.redirect('/users')
	})
}