import React, { useState, useRef, useEffect } from 'react';
import './ChatWindow.css'; // Import the CSS file for styling

const ChatWindow = ({ messages, onSendMessage, loading }) => {
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef(null); // Reference to the end of the chat

  useEffect(() => {
    // Scroll to the bottom of the chat when messages change
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim() !== '') {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent newline
      handleSend();
    }
  };

  return (
    <div className="chat-window">
      <header className="chat-header">
        <h1>C5i Support</h1>
      </header>
      <div className="chat-history">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.user}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="loading">Typing...</div>}
        {/* Dummy element to enable scrolling to the bottom */}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input">
        <input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Type your message here..."
          rows="3"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
