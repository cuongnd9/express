const express = require('express')
const router = express.Router()
const shortid = require('shortid')

const db = require('../db')

const users = db.get('users').value()

router.get('/', (req, res) => res.render('users/index', { 
	screenName: 'Users',
	users: users
}))

router.get('/search', (req, res) => {
	var q = req.query.q;
	var mathchedUsers = users.filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)
	
	res.render('users/index', {
		screenName: 'Results',
		users: mathchedUsers,
		q: q
	})
})

router.get('/create', (req, res) => {
	res.render('users/create', { screenName: 'Create User' })
})

router.get('/:id', (req, res) => {
	var id = req.params.id;
	var user = db.get('users').find({id: id}).value()

	res.render('users/view', { screenName: 'Detail User', user: user })
})

router.post('/create', (req, res) => {
	req.body.id = shortid.generate();
	db.get('users').push(req.body).write()
	res.redirect('/users')
})

module.exports = router