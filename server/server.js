const express = require('express');
const { connectToMongoDB } = require('./db/database'); // Update the path accordingly
const app = express();
const PORT = process.env.PORT || 3004;

// Connect to MongoDB
connectToMongoDB()
  .then((db) => {
    console.log('Connected to MongoDB');


    app.use(express.json());

    // API endpoint for user registration
    app.post('/api/register', async (req, res) => {
      const { name, contactNumber, age, selectedBatch } = req.body;

    

      try {
        // Insert user data into the "users" collection
        const result = await db.collection('users').insertOne({
          name,
          contactNumber,
          age,
          selectedBatch,
        });

        console.log('User registered successfully:', result.insertedId);
        res.status(201).send('User registered successfully');
      } catch (err) {
        console.error('Failed to register user:', err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
      }
    });

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start the server:', err);
  });
