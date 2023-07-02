const mongoose = require('mongoose');

const databaseUrl =process.env.MONGODB_URL;
const dbConnect = () => {
    mongoose
      .connect(databaseUrl, {})
      .then(() => console.log('Mongodb connected'))
      .catch(err => console.log(err));
};

module.exports = dbConnect;