//services/sqlService.js
const db = require('../models');

const queryDatabase = async (query) => {
  try {
    const [results] = await db.sequelize.query(query);
    return results; // Ensure results are returned correctly
  } catch (error) {
    console.error('Failed to query the database:', error);
    return [];
  }
};

module.exports = { queryDatabase };


