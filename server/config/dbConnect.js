const mongoose = require('mongoose');

const databaseUrl ='mongodb+srv://saikrupa1320:fHXYsVqsBpowCqVO@cluster0.irifunz.mongodb.net/book-list-app';
const dbConnect = () => {
    mongoose
      .connect(databaseUrl, {})
      .then(() => console.log('Mongodb connected'))
      .catch(err => console.log(err));
};

module.exports = dbConnect;