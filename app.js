const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const signale = require('signale')

const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')

const authMiddleWare = require('./middlewares/auth.middleware')

const port = 3000

const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(express.static('public'))

app.get('/', (req, res) => res.render('index', { title: 'Home' }))

app.use('/users', authMiddleWare.requireAuth, userRoute)
app.use('/auth', authRoute)

app.listen(port, () => signale.debug(`Listening on port ${port}`))