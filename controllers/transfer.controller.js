const nanoid = require('nanoid')

const db = require('../db')

module.exports.create = (req, res) => {
	res.render('transfer/create', {
		title: 'Transfer',
		csrfToken: req.csrfToken()
	})
}

module.exports.postCreate = (req, res) => {
	const transfer = {
		id: nanoid(),
		account: req.body.account,
		amount: parseInt(req.body.amount),
		userId: req.signedCookies.userId
	}

	db.get('transfers').push(transfer).write()

	res.redirect('/transfer/create')
}