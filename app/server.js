const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const redisClient = require('./config/redis');
const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);

sequelize.sync()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

(async () => {
  try {
    await redisClient.connect();
    console.log('Redis connected');
  } catch (err) {
    console.error('Redis connection error:', err);
  }
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;