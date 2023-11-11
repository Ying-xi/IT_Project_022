const mongoose = require('mongoose')
const Upload = require('./upload')
const mongodb = process.env.MONGODB_PWD
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection


db.on('open', ()=>{
    console.log('successful')
})

db.on('error', ()=>{
    console.log('error')
})

module.exports = db
