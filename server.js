const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const user = require('./routes/user-routes');
const product = require('./routes/product-routes');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/users', user);
app.use("/api/products", product);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
