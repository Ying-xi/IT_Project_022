const mongoose = require('mongoose')
const Upload = require('./upload')
const mongodb = 'mongodb+srv://admin:sVAV1RGC6xqrBEL2@cluster0.kkodvpg.mongodb.net/music_therapy?retryWrites=true&w=majority'
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection


db.on('open', ()=>{
    console.log('successful')
})

db.on('error', ()=>{
    console.log('error')
})

module.exports = db
