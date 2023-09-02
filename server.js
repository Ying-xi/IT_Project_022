const express = require('express')
const web = express()

const cors = require('cors')

web.use(cors())
web.use(express.urlencoded({extended: false}))

web.use(express.static('Files/staticPage'))
web.use(express.static('Files/login'))
web.use(express.static('Files/musicPlayer'))

const userRouter = require('./Router/user')
const musicRouter = require('./Router/musicPlayer')
const homeRouter = require('./Router/homePage')

web.use(userRouter)
web.use(musicRouter)
web.use(homeRouter)

// running server
web.listen(3300, ()=>{
    console.log('server running')
})