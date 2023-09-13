const bcryptjs = require('bcryptjs')
const db = require('../Database/db')
const {User} = require('../Schema/user')

// handler for login
exports.login = async (req, res) =>{
    const { username, password } = req.body
    const user = await User.findOne({ username })
    console.log(req.body)
    if (!user || !bcryptjs.compareSync(password, user.password)) {
        res.status(401).json({ error: 'Wrong Username or Password' })
    } else {
        const token = user.generateAuthToken()
	    res.status(200).send({ data: 'Bearer'+ token, message: "Logging in" })
    }
}