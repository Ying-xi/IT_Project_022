const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
	const token = req.header("Authorization").replace('Bearer ', '')
	if (!token)
		return res
			.status(400)
			.send({ message: "No token provided" })

	// verify token
	jwt.verify(token, 'IT-Project-022', (err, validToken) => {
		if (err) {
			console.log(token)
			return res.status(400).send({ message: "invalid token" })
		} else {
			req.user = validToken
			next()
		}
	})
}