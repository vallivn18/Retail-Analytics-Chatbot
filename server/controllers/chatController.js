//controllers/chatController.js
const { Chat } = require('../models');
const { generateResponseFromLLM } = require('../services/gptService');
const { queryDatabase } = require('../services/sqlService');

// Get chat history from database
const getChatHistory = async (req, res) => {
  try {
    const history = await Chat.findAll();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve chat history.' });
  }
};

// Initial greeting when a user connects
const initialGreeting = async () => {
  try {
    const greeting = 'Hello! How can I assist you with retail analytics today?';
    await Chat.create({
      user: 'bot',
      message: greeting,
      timestamp: new Date(),
    });
    return greeting;
  } catch (error) {
    console.error('Failed to send initial greeting:', error);
    return 'Hello! How can I assist you today?';
  }
};

const chatWithBot = async (req, res) => {
  const { message } = req.body;
  const lowerMessage = message.toLowerCase();

  try {
    let query;
    let response;

    // Always send the initial greeting if no prior chat history exists
    const greetingResponse = await initialGreeting();
    if (lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
      response = `Hello! How can I assist you with retail analytics today?` ;
    } else if (lowerMessage.includes('total sales last week')) {
      query = 'SELECT SUM(sales) AS total_sales_last_week FROM sales_data WHERE sale_date >= CURDATE() - INTERVAL 7 DAY';
      const data = await queryDatabase(query);
      response = `The total sales amount for last week is: $${data[0]?.total_sales_last_week || 'No data available'}`;
    } else if (lowerMessage.includes('total sales this month')) {
      query = 'SELECT SUM(sales) AS total_sales_this_month FROM sales_data WHERE MONTH(sale_date) = MONTH(CURDATE()) AND YEAR(sale_date) = YEAR(CURDATE())';
      const data = await queryDatabase(query);
      response = `The total sales amount for this month is: $${data[0]?.total_sales_this_month || 'No data available'}`;
    } else if (lowerMessage.includes('most popular item')) {
      query = `
        SELECT p.name, SUM(s.sales) AS total_sales
        FROM products p
        JOIN sales_data s ON p.id = s.product_id
        GROUP BY p.id
        ORDER BY total_sales DESC
        LIMIT 1;
      `;
      console.log('Executing top-selling product query:', query);
      const data = await queryDatabase(query);
      console.log('Top-selling product query result:', data);

      if (Array.isArray(data) && data.length > 0) {
        const topProduct = data[0];
        response = `The top-selling product is ${topProduct.name} with total sales of $${topProduct.total_sales}`;
      } else {
        response = 'No top-selling product information available.';
      }
    } else if (lowerMessage.includes('products list') || lowerMessage.includes('product')) {
      query = 'SELECT name FROM products';
      console.log('Executing product query:', query);
      const data = await queryDatabase(query);
      console.log('Product query result:', data);

      if (Array.isArray(data) && data.length > 0) {
        // Format each product on a new line
        response = 'Available Products:\n' + data.map(p => `${p.name}, \n`).join('\n');
      } else {
        response = 'No product information available.';
      }
    } else {
      const llmResponse = await generateResponseFromLLM(message);
      response = llmResponse.includes('sales') || llmResponse.includes('product') || llmResponse.includes('retail market')
        ? llmResponse
        : 'I am here to assist with retail analytics. Please ask about sales or product data.';
    }

    // Save the response to chat history
    await Chat.create({
      user: 'bot',
      message: response,
      timestamp: new Date(),
    });

    return res.json({ user: 'bot', text: response });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Failed to process the request.' });
  }
};


module.exports = { getChatHistory, chatWithBot, initialGreeting };
