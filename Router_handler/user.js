const bcryptjs = require('bcryptjs')
const db = require('../Database/db')
const {User} = require('../Schema/user')

// handler for register
exports.register = (req, res) =>{
    // check if user types in nothing
    //if(!userInfo.username || !userInfo.password || !userInfo.email){
    //    return res.send({message: 'invalid'})
    //}

    // encrypt users' password using bcryptjs
    //userInfo.password = bcryptjs.hashSync(userInfo.password, 10)

    // insert new user information into database
    //const sql = 'insert into users set ?'
    //db.query(sql, {username: userInfo.username, password: userInfo.password, email: userInfo.email})
}
// handler for login
exports.login = async (req, res) =>{
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user || !bcryptjs.compareSync(password, user.password)) {
        res.status(401).json({ error: 'Wrong Username or Password' })
    } else {
        const token = user.generateAuthToken()
	    res.status(200).send({ data: 'Bearer'+ token, message: "Logging in" })
    }
}