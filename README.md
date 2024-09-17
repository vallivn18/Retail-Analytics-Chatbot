PRE-REQUISITES - React Application (Nodejs)

=> MySQL
  - Create tables as mentioned in database.sql

=> client 
  - npm install axios react-router-dom

=> server
  - npm install express sequelize mysql2 dotenv cors body-parser axios

=> .env (Create a .env file in server with following values)
   DB_HOST=your_database_hostname
   DB_USER=your_database_username
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   HUGGINGFACE_API_KEY=your_access_token
 

To run (after installing all required node modules)
1. Go to 'server' directory in terminal and enter "npm start"
2. Go to 'client' directory in terminal and enter "npm start"

Chatbot will be displayed in  http://localhost:3000  

Sample Valid Questions to ask
 - What products do you have?
 - Tell me about the most popular item.
 - What were the total sales last week?
 - How much were the sales this month?
 - What insights can you provide about customer preferences based on recent sales data?
 - What are the current trends in the retail market?

Sample Invalid questions
 - What is the weather like today?
 - Can you tell me a joke?
 - How do I make a cup of coffee?
 - Can you book a flight for me?
