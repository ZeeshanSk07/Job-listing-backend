const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const port = 4000;
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => 
    console.log('Error connecting to database')
  );

app.get('/health', (req, res) => {
  res.json({
    message: 'Health API is working fine',
    status: 200,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
