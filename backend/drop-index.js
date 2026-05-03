require('dotenv').config();
const mongoose = require('mongoose');

// Force Node.js to use Google DNS
require('dns').setServers(['8.8.8.8', '8.8.4.4']);

const dropIndex = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Get the stocks collection
    const collection = mongoose.connection.collection('stocks');
    
    // Drop the SKU index
    await collection.dropIndex('SKU_1');
    console.log('Successfully dropped the SKU_1 index!');
    
  } catch (error) {
    if (error.codeName === 'IndexNotFound') {
      console.log('Index already dropped or not found. You are good to go!');
    } else {
      console.error('Error dropping index:', error.message);
    }
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

dropIndex();
