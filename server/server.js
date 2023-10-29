const express = require('express')
const web = express()
const expressJWT = require('express-jwt')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./Database/mongodb')
const albumRouter = require('./Router/albumPlayer')
const userRouter = require('./Router/user')
const musicRouter = require('./Router/musicPlayer')
const homeRouter = require('./Router/homePage')
const adminRouter = require('./Router/admin')

web.use('/music', express.static(__dirname + '/Default_music/Musics'))
web.use('/images', express.static(__dirname + '/Default_music/Images'))
web.use('/album', express.static(__dirname + '/Default_music/Albums'))
web.use('/admin', expressJWT({secret: 'IT-Project-022', algorithms: ['HS256']}))
web.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}))
web.use(express.urlencoded({extended: false}))
web.use(bodyParser.json())
web.use(express.static('Files/staticPage'))
web.use(express.static('Files/login'))
web.use(express.static('Files/musicPlayer'))

web.use(adminRouter)
web.use(userRouter)
web.use(musicRouter)
web.use(homeRouter)
web.use(albumRouter)

// running server
web.listen(3300, ()=>{
    console.log('server running')
})