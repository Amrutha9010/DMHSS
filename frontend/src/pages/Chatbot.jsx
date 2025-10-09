import { useState, useRef, useEffect } from 'react';
import { Heart, Phone } from 'lucide-react';
import './Chatbot.css';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hello! I'm here to support you. How are you feeling today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickButtons = [
    'Exam Stress',
    'Sleep Issues',
    'Motivation',
    'Anxiety Help'
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ✅ Send message to Flask backend
  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Call Flask API
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();

      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: data.reply || "I'm here for you — could you tell me more?",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error connecting to chatbot:', error);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 2,
          type: 'bot',
          text: "⚠️ I’m having trouble connecting to the server. Please try again later.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  const handleQuickButton = (buttonText) => {
    sendMessage(buttonText);
  };

  return (
    <div className="chatbot-container">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <Heart className="logo-icon" />
            <span>MindCare</span>
          </div>
          <nav className="nav">
            {/* <a href="/chatbot" className="nav-link">Support</a> */}
            <a href="/" className="nav-link">Home</a>
            <a href="/resources" className="nav-link">Resources</a>
            <a href="/booking" className="nav-link">Book Session</a>
            <button className="emergency-btn">
              <Phone size={18} />
              Emergency Help
            </button>
          </nav>
        </div>
      </header>

      {/* Chat Window */}
      <div className="chat-window">
        <div className="messages-container">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="message-bubble">
                <p className="message-text">{message.text}</p>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot-message typing-message">
              <div className="message-bubble">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Buttons */}
        {messages.length <= 2 && (
          <div className="quick-buttons">
            <p className="quick-buttons-label">Quick topics:</p>
            <div className="buttons-grid">
              {quickButtons.map((button, index) => (
                <button
                  key={index}
                  className="quick-button"
                  onClick={() => handleQuickButton(button)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {button}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="input-section">
        <form onSubmit={handleSubmit} className="input-form">
          <div className="input-container">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message here..."
              className="message-input"
              disabled={isTyping}
            />
            <button
              type="submit"
              className="send-button"
              disabled={!inputText.trim() || isTyping}
            >
              <span className="send-icon">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatbotPage;