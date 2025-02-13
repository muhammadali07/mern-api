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

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);

sequelize.sync()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

process.on('SIGINT', async () => {
  if (redisClient.isOpen) {
    await redisClient.disconnect();
    console.log("Redis disconnected.");
  }
  process.exit(0);
});


const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;