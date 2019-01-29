const db = require('../db')

module.exports.index = (req, res) => {
	const page = parseInt(req.query.page) || 1
	const perPage = 12
	const start = (page - 1) * perPage
	const end = page * perPage
	res.render('products/index', {
		title: 'Products',
		products: db.get('products').value().slice(start, end)
	})
}