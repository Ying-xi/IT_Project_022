const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/db_01', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('open', ()=>{
    console.log('successful')
})

db.on('error', ()=>{
    console.log('error')
})

module.exports = db
