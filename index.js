const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserRoute = require('./routes/UserRoute');
const jobRoute = require('./routes/jobRoute');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

dotenv.config();

const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());



mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Database connected');
  }).catch(err => 
    console.log('Error connecting to database')
  );

app.use('/user', UserRoute);
app.use('/job', jobRoute);

app.get('/health', (req, res) => {
  // res.send
  res.json({
      message: 'Job listing API is working fine',
      status: 'Working',
      date: new Date().toLocaleDateString()
  });
});

app.use("*", (req, res) => {
  res.status(404).json({
      message: 'Endpoint not found',
      status: 'Error',
  });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
