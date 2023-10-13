const fs = require('fs')
const base64 = require('base64-js')
const bcryptjs = require('bcryptjs')
const {Music} = require("../Schema/music")
const {User} = require('../Schema/user')

const musicData = fs.readFileSync(__dirname+'/../Default_music/data.json', 'utf-8')

exports.uploadMusic = async () => {
    const jsonData = JSON.parse(musicData)
    
    for (var data of jsonData) {
        const mp3Data = fs.readFileSync(data.file)
        const mp3Base64 = base64.fromByteArray(mp3Data)
        const jpgData = fs.readFileSync(data.picture)
        const jpgBase64 = base64.fromByteArray(jpgData)

        var music = new Music({
            name: data.name,
            picture: jpgBase64,
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

exports.uploadAdmin = () =>{
    try {
        const { username, password } = {username:'admin', password:'123456'}
    
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const user = new User({ username, password: hashedPassword })
        user.save()
        console.log('Successfully uploaded')
      } catch (error) {
        console.error(error)
        
      }
}