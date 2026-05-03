require('dotenv').config();
const mongoose = require('mongoose');

// Try to connect to the standard SRV URI first but with family: 4
mongoose.connect(process.env.MONGO_URI, { family: 4 })
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection failed:', err.message);
    process.exit(1);
  });
