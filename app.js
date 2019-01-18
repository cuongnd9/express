const express = require('express')
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid')

const app = express()
const port = 3000

const adapter = new FileSync('db.json')
const db = low(adapter)

// set some defaults
db.defaults({users: []}).write()

const users = db.get('users').value()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('index', { screenName: 'Home' }))

app.get('/users', (req, res) => res.render('users/index', { 
	screenName: 'Users',
	users: users
}))

app.get('/users/search', (req, res) => {
	var q = req.query.q;
	var mathchedUsers = users.filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)
	
	res.render('users/index', {
		screenName: 'Results',
		users: mathchedUsers,
		q: q
	})
})

app.get('/users/create', (req, res) => {
	res.render('users/create', { screenName: 'Create User' })
})

app.get('/users/:id', (req, res) => {
	var id = req.params.id;
	var user = db.get('users').find({id: id}).value()

	res.render('users/view', { screenName: 'Detail User', user: user })
})

app.post('/users/create', (req, res) => {
	req.body.id = shortid.generate();
	db.get('users').push(req.body).write()
	res.redirect('/users')
})

app.listen(port, () => console.log(`Listening on port ${port}`))