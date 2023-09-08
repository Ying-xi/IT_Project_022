const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
	const token = req.header("Authorization")
	if (!token)
		return res
			.status(400)
			.send({ message: "No token provided" })

	jwt.verify(token, 'IT-Project-022', (err, validToken) => {
		if (err) {
			return res.status(400).send({ message: "invalid token" })
		} else {
			req.user = validToken
			next()
		}
	})
}