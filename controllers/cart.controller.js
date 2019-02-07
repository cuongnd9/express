const Session = require('../models/session.model')

module.exports.addToCart = (req, res, next) => {
	const productId = req.params.productId
	const sessionId = req.signedCookies.sessionId

	if (!sessionId) {
		res.redirect('/products')
		return
	}

	Session
		.findOne({ id: sessionId })
		.then(session => {
			var index;
			const product = session.cart.find((product, i) => {
				index = i
				return product.productId === productId
			})
			if (product) {
				session.cart[index].count += 1
			} else {
				session.cart.push({
					productId: productId,
					count: 1
				})
			}

			session
				.save()
				.then(() => {
					res.redirect('back')
				})
		})
}