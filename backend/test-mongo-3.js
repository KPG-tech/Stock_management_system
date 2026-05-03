require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true);

const uri = "mongodb://kavishkapathum22_db_user:I7ejdBoCWrMOf7Kt@ac-hwz2vyr-shard-00-00.74kiceo.mongodb.net:27017,ac-hwz2vyr-shard-00-01.74kiceo.mongodb.net:27017,ac-hwz2vyr-shard-00-02.74kiceo.mongodb.net:27017/stock_management?ssl=true&authSource=admin&replicaSet=atlas-hwz2vyr-shard-0&retryWrites=true&w=majority&appName=Cluster0";

console.log("Connecting...");
mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('Connected to MongoDB successfully with standard string!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection failed:', err.message);
    process.exit(1);
  });
