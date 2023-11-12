const mongoose = require('mongoose');
const Upload = require('./upload');

// const mongodb = process.env.MONGODB_PWD;
const mongodb = 'mongodb+srv://admin:sVAV1RGC6xqrBEL2@cluster0.kkodvpg.mongodb.net/music_therapy?retryWrites=true&w=majority';

const poolSize = 10;

mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: poolSize,
});

const db = mongoose.connection;

db.on('open', () => {
  console.log('Connection successful');
});

db.on('error', (err) => {
  console.error('Connection error:', err);
});

module.exports = db;
