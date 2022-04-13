const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://hensonalex:mongomongo@cluster0.xzwys.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
    .then(client => {
      console.log('Connected to DB!');
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = mongoConnect;


