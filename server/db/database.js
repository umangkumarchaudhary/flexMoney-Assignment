// ./db/database module

const { MongoClient } = require('mongodb');

const uri = 'mongodb://kumarumang282@gmail.com:umangkumarch@localhost:27017/yogaClasses';

const connectToMongoDB = async () => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db();
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};

module.exports = { connectToMongoDB };
