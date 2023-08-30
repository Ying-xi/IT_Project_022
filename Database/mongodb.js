const mongoose = require('mongoose')
const fs = require('fs');
const {Music} = require("../Schema/music")
const mongodb = 'mongodb+srv://admin:sVAV1RGC6xqrBEL2@cluster0.kkodvpg.mongodb.net/music_therapy?retryWrites=true&w=majority'
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
const collectionName = 'music_info'

db.on('open', ()=>{
    console.log('successful')
})

db.on('error', ()=>{
    console.log('error')
})

const musicData = fs.readFileSync('../Default_music/data.json', 'utf-8')

async function uploadMusic(){
    const jsonData = JSON.parse(musicData)
    
    for (var data of jsonData) {
        var music = new Music({
            name: data.name,
            picture: data.picture,
            file: data.file
        })
        
        try {
            await music.save({ db, collection: collectionName })
            console.log(`Uploaded: ${data.name}`)
        } catch (error) {
            console.error(`Error uploading ${data.name}: ${error}`);
        }
    }
}
uploadMusic()

module.exports = db
