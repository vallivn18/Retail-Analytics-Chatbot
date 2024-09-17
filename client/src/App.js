import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import { getChatHistory, sendMessageToChatbot } from './services/chatbotService';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializeChat = async () => {
      const history = await getChatHistory();
      if (history.length === 0) {
        // Send initial greeting message if history is empty
        const initialGreeting = { user: 'bot', text: 'Hello! How can I assist you with retail analytics today?' };
        setMessages([initialGreeting]);
        // Optionally save the initial greeting in the backend
        await sendMessageToChatbot(''); // Ensure the backend is aware of the greeting
      } else {
        setMessages(history);
      }
    };

    initializeChat();
  }, []);

  const handleSendMessage = async (text) => {
    setLoading(true);
    const newMessage = { user: 'customer', text };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const botResponse = await sendMessageToChatbot(text);
    setMessages((prevMessages) => [...prevMessages, botResponse]);
    setLoading(false);
  };

  return (
    <div className="App">
      <ChatWindow messages={messages} onSendMessage={handleSendMessage} loading={loading} />
    </div>
  );
};

export default App;
