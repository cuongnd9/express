const User = require('../models/user.model')

module.exports.index = (req, res) => {
	User.find().then(users => {
		res.render('users/index', { 
			title: 'Users',
			users: users
		})
	})
}

module.exports.search = (req, res) => {
	var q = req.query.q;
	User.find().then(users => {
		var mathchedUsers = users.filter(
			user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
		)
		
		res.render('users/index', {
			title: 'Results',
			users: mathchedUsers,
			q: q
		})
	})
}

module.exports.create = (req, res) => {
	res.render('users/create', { 
		title: 'Create User'
	})
}

module.exports.get = (req, res) => {
	var id = req.params.id
	User.find().then(users => {
		var result = users.find(user => user.id === id)
		res.render('users/view', { 
			title: 'Detail User', 
			user: result 
		})
	})
}

module.exports.postCreate = (req, res) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		avatar: req.file.path.split('/').slice(1).join('/')
	})

	user.save().then(() => {
		res.redirect('/users')
	})
}