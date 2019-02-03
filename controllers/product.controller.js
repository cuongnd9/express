const db = require('../db')

module.exports.index = (req, res) => {
	const page = parseInt(req.query.page) || 1
	const perPage = 12
	const start = (page - 1) * perPage
	const end = page * perPage

	const pages = []
	const totalItems = db.get('products').value().length
	const lastPage = Math.ceil(totalItems / perPage)
	var disabledPage = 0 // 0: not, -1: previous, 1: next

	if (page === 1) {
		pages.push(1, 2 , 3)
		disabledPage = -1
	}

	if (page === lastPage) {
		pages.push(page - 2, page - 1, page)
		disabledPage = 1
	}

	if (page > 1 && page < lastPage) {
		pages.push(page - 1, page, page + 1)
	}

	const sessionId = req.signedCookies.sessionId
	let products = db
		.get('sessions')
		.find({ id: sessionId })
		.value()
		.cart
	var total = 0	
	for (var idProduct in products) {
		total += products[idProduct]
	}
	res.locals.total = total

	res.render('products/index', {
		title: 'Products',
		products: db.get('products').value().slice(start, end),
		pages: pages,
		activePage: page,
		disabledPage: disabledPage
	})
}