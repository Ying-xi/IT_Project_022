const mongoose = require('mongoose')
const fs = require('fs')
const base64 = require('base64-js')
const {Music} = require("../Schema/music")
const mongodb = 'mongodb+srv://admin:sVAV1RGC6xqrBEL2@cluster0.kkodvpg.mongodb.net/music_therapy?retryWrites=true&w=majority'
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection


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
        const mp3Data = fs.readFileSync(data.file)
        const mp3Base64 = base64.fromByteArray(mp3Data)

        var music = new Music({
            name: data.name,
            picture: data.picture,
            file: mp3Base64,
        })
        
        try {
            await music.save()
            console.log(`Uploaded: ${data.name}`)
        } catch (error) {
            console.error(`Error uploading ${data.name}: ${error}`);
        }
    }
}
uploadMusic()

module.exports = db
