//services/chatbotService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getChatHistory = async () => {
  const response = await axios.get(`${API_BASE_URL}/history`);
  return response.data;
};

export const sendMessageToChatbot = async (message) => {
  const response = await axios.post(`${API_BASE_URL}/chat`, { message });
  return response.data;
};
