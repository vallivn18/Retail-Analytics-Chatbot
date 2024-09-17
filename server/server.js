const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
const db = require('./models');
const { initialGreeting } = require('./controllers/chatController');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', chatRoutes);

// Initialize database and send initial greeting
db.sequelize.sync().then(async () => {
  await initialGreeting();
  app.listen(5000, () => {
    console.log('Server running on port 5000');
  });
});
