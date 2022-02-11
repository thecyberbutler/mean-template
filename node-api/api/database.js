const mongoose = require('mongoose');

const uri = process.env.DB_URI;

const connect = () => {
  mongoose.connect(uri, {}, () => {
    console.log('DB Connected...');
  });
};

const close = async () => {
  await mongoose.disconnect();
};

module.exports = { connect, close };
