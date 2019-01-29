require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const signale = require('signale')

const authRoute = require('./routes/auth.route')
const userRoute = require('./routes/user.route')
const productRoute = require('./routes/product.route')

const authMiddleWare = require('./middlewares/auth.middleware')

const port = 3000

const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET))

app.use(express.static('public'))

app.get('/', (req, res) => res.render('index', { title: 'Home' }))

app.use('/auth', authRoute)
app.use('/users', authMiddleWare.requireAuth, userRoute)
app.use('/products', authMiddleWare.requireAuth, productRoute)

app.listen(port, () => signale.debug(`Listening on port ${port}`))