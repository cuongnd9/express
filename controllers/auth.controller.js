const md5 = require('md5')
const db = require('../db')

module.exports.login = (req, res) => {
	res.render('auth/login', { title: 'Login' })
}

module.exports.postLogin = (req, res) => {
	var { email, password } = req.body

	var user = db.get('users').find({ email: email }).value()

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
	
	if (user.password !== md5(password)) {
		res.render('auth/login', {
			title: 'Login',
			errors: [
				'Wrong password.'
			],
			values: req.body
		})
		return;
	}

	res.cookie('userId', user.id)
	res.redirect('/users')
}