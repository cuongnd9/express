require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const signale = require('signale')

const authRoute = require('./routes/auth.route')
const userRoute = require('./routes/user.route')
const productRoute = require('./routes/product.route')
const cartRoute = require('./routes/cart.route')

const authMiddleware = require('./middlewares/auth.middleware')
const sessionMiddleware = require('./middlewares/session.middleware')

const port = 3000

const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(sessionMiddleware)

app.use(express.static('public'))
app.use('/users', express.static('public'))

app.get('/', (req, res) => res.render('index', { title: 'Home' }))

app.use('/auth', authRoute)
app.use('/users', authMiddleware.requireAuth, userRoute)
app.use('/products', productRoute)
app.use('/cart', cartRoute)

app.listen(port, () => signale.debug(`Listening on port ${port}`))