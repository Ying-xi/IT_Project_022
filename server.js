const express = require('express')
const web = express()

const cors = require('cors')

web.use(cors())
web.use(express.urlencoded({extended: false}))

const userRouter = require('./Router/user')
web.use(userRouter)

// running server
web.listen(3300, ()=>{
    console.log('server running')
})