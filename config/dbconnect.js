const config = require('config');
const mongoose = require('mongoose');

const dbURL = config.get('dbURL') || 'mongodb://localhost:27017/contactDB';
console.log(dbURL)

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.set('useFindAndModify', false);
    console.log('you are connected to the database');
  } catch (err) {
    console.log('Connection Error ' + err);
    process.exit(1); // exit with failure
  }
};

module.exports = connectDB;
