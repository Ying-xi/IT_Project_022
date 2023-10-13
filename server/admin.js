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
            if(!validToken.isAdmin){
                return res
					.status(403)
					.send({ message: "You don't have access to this" });
            }
			req.user = validToken
			next()
		}
	})
}