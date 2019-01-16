const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => res.render('index', { screenName: 'Home' }))
app.get('/users', (req, res) => res.render('users/index', { 
	screenName: 'Users',
	users: [
		{id: 1, name: 'jade28'},
		{id: 2, name: 'iamzeng'}
		]
}))

app.listen(port, () => console.log(`Listening on port ${port}`))