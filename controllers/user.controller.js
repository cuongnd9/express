const db = require('../db')
const shortid = require('shortid')

module.exports.index = (req, res) => res.render('users/index', { 
	screenName: 'Users',
	users: db.get('users').value()
})

module.exports.search = (req, res) => {
	var q = req.query.q;
	var mathchedUsers = db.get('users').value().filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)
	
	res.render('users/index', {
		screenName: 'Results',
		users: mathchedUsers,
		q: q
	})
}

module.exports.create = (req, res) => {
	res.render('users/create', { screenName: 'Create User' })
}

module.exports.get = (req, res) => {
	var id = req.params.id;
	var user = db.get('users').find({id: id}).value()

	res.render('users/view', { screenName: 'Detail User', user: user })
}

module.exports.postCreate = (req, res) => {
	req.body.id = shortid.generate();
	db.get('users').push(req.body).write()
	res.redirect('/users')
}