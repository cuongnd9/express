const db = require('../db')
const shortid = require('shortid')
const signale = require('signale')

module.exports.index = (req, res) => res.render('users/index', { 
	title: 'Users',
	users: db.get('users').value()
})

module.exports.search = (req, res) => {
	var q = req.query.q;
	var mathchedUsers = db.get('users').value().filter(
		user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
	)
	
	res.render('users/index', {
		title: 'Results',
		users: mathchedUsers,
		q: q
	})
}

module.exports.create = (req, res) => {
	res.render('users/create', { title: 'Create User' })
}

module.exports.get = (req, res) => {
	var id = req.params.id
	var user = db.get('users').find({id: id}).value()
	res.render('users/view', { 
		title: 'Detail User', 
		user: user 
	})
}

module.exports.postCreate = (req, res) => {
	req.body.id = shortid.generate()
	req.body.avatar = req.file.path.split('/').slice(1).join('/')
	db.get('users').push(req.body).write()
	res.redirect('/users')
}