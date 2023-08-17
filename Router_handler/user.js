const bcryptjs = require('bcryptjs')
const db = require('../Database/db')

// handler for register
exports.register = (req, res) =>{
    const userInfo = req.body
    // check if user types in nothing
    if(!userInfo.username || !userInfo.password || !userInfo.email){
        return res.send({message: 'invalid'})
    }

    // encrypt users' password using bcryptjs
    userInfo.password = bcryptjs.hashSync(userInfo.password, 10)

    // insert new user information into database
    const sql = 'insert into users set ?'
    db.query(sql, {username: userInfo.username, password: userInfo.password, email: userInfo.email})
}
// handler for login
exports.login = (req, res) =>{

}