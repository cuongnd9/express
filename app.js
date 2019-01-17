const express = require('express')
const app = express()
const port = 3000

const users = [
	{ id: 1, name: 'jade28' },
	{ id: 2, name: 'ndc07' },
	{ id: 3, name: 'iamzeng' },
	{ id: 4, name: 'zeng' }
]

app.set('view engine', 'pug')
app.set('views', './views')

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

app.listen(port, () => console.log(`Listening on port ${port}`))