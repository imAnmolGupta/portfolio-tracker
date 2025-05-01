const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const testRoute = require('./routes/testRoute');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/testdata', testRoute);

const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Test API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API working fine!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
console.log(PORT)

