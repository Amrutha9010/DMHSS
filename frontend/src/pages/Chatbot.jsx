import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! I\'m here to support you. How are you feeling today?',
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

  const botResponses = {
    'exam stress': 'Exam stress is completely normal. Try the 4-7-8 breathing technique: inhale for 4, hold for 7, exhale for 8. Would you like me to guide you through this?',
    'sleep issues': 'Sleep troubles can increase stress. Try creating a bedtime routine: no screens 1 hour before bed, dim lights, and perhaps some gentle music. What time do you usually go to bed?',
    'motivation': 'Remember, every small step counts! Break your tasks into tiny, manageable pieces. Celebrate each completion - you\'re doing better than you think. What\'s one small thing you can accomplish today?',
    'anxiety help': 'Anxiety can feel overwhelming, but you\'re not alone. Try the 5-4-3-2-1 grounding technique: 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. Take your time.',
    'default': 'I understand you\'re going through something difficult. Remember, it\'s okay to not be okay sometimes. Take deep breaths and be kind to yourself. Can you tell me more about what\'s bothering you?'
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('exam') || message.includes('test') || message.includes('study')) {
      return botResponses['exam stress'];
    } else if (message.includes('sleep') || message.includes('tired') || message.includes('insomnia')) {
      return botResponses['sleep issues'];
    } else if (message.includes('motivat') || message.includes('give up') || message.includes('lazy')) {
      return botResponses['motivation'];
    } else if (message.includes('anxious') || message.includes('anxiety') || message.includes('worried')) {
      return botResponses['anxiety help'];
    } else {
      return botResponses['default'];
    }
  };

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

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: getBotResponse(text),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
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
            <a href="/chatbot" className="nav-link">Support</a>
            <a href="#resources" className="nav-link">Resources</a>
            <a href="#community" className="nav-link">Community</a>
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