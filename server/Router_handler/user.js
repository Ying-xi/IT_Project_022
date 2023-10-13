const bcryptjs = require('bcryptjs')
const db = require('../Database/db')
const {User} = require('../Schema/user')

// handler for login
exports.login = async (req, res) =>{
    const { username, password } = req.body
    const user = await User.findOne({ username })
    
    // check if username and password are correct
    if (!user || !bcryptjs.compareSync(password, user.password)) {
        res.status(401).json({ error: 'Wrong Username or Password' })
    } else {
        const token = user.generateAuthToken()
	    res.status(200).send({ data: token, message: "Logging in" })
    }
}

exports.register = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({username})
    if(user){
        return res
			.status(403)
			.send({ message: "given username is already registered" });
    }
    try {
        const hashedPassword = bcryptjs.hashSync(password, 10)
        let newUser = await new User({
            ...req.body,
            password: hashedPassword,
        }).save()

        newUser.password = undefined
        res
		.status(200)
		.send({ data: newUser, message: "Account created successfully" })
        
      } catch (error) {
        console.error(error)
        
      }
	
}