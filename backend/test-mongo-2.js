require('dotenv').config();
const mongoose = require('mongoose');

const uri = "mongodb://kavishkapathum22_db_user:I7ejdBoCWrMOf7Kt@ac-hwz2vyr-shard-00-00.74kiceo.mongodb.net:27017,ac-hwz2vyr-shard-00-01.74kiceo.mongodb.net:27017,ac-hwz2vyr-shard-00-02.74kiceo.mongodb.net:27017/?ssl=true&replicaSet=atlas-hwz2vyr-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB successfully with standard string!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection failed:', err.message);
    process.exit(1);
  });
