import React, { useState, useEffect } from 'react';
import { Heart, Phone, ArrowRight, Zap, BookOpen, Users, Shield, MessageCircle, Calendar } from 'lucide-react';
import './Resources.css';

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sample resources data
  const resourcesData = [
    {
      id: 1,
      title: "Breathing Exercise Guide",
      description: "Learn simple breathing techniques to reduce anxiety and stress in minutes.",
      category: "exercises",
      type: "pdf",
      duration: "5 min",
      icon: "🧘‍♀️"
    },
    {
      id: 2,
      title: "Mindfulness Meditation",
      description: "Guided meditation sessions for beginners to practice mindfulness.",
      category: "meditation",
      type: "audio",
      duration: "15 min",
      icon: "🎧"
    },
    {
      id: 3,
      title: "Stress Management Tips",
      description: "Practical strategies to manage academic stress and pressure.",
      category: "articles",
      type: "article",
      duration: "10 min",
      icon: "📝"
    },
    {
      id: 4,
      title: "Sleep Better Tonight",
      description: "Techniques to improve sleep quality and overcome insomnia.",
      category: "sleep",
      type: "video",
      duration: "12 min",
      icon: "😴"
    },
    {
      id: 5,
      title: "Progressive Muscle Relaxation",
      description: "Step-by-step guide to release tension throughout your body.",
      category: "exercises",
      type: "video",
      duration: "8 min",
      icon: "💆‍♂️"
    },
    {
      id: 6,
      title: "Coping with Anxiety",
      description: "Understanding anxiety triggers and developing healthy coping mechanisms.",
      category: "articles",
      type: "pdf",
      duration: "15 min",
      icon: "📚"
    },
    {
      id: 7,
      title: "Yoga for Stress Relief",
      description: "Gentle yoga sequences specifically designed to reduce stress.",
      category: "exercises",
      type: "video",
      duration: "20 min",
      icon: "🧘"
    },
    {
      id: 8,
      title: "Positive Affirmations",
      description: "Daily affirmations to boost self-esteem and mental wellbeing.",
      category: "meditation",
      type: "audio",
      duration: "5 min",
      icon: "🌟"
    }
  ];

  // Filter resources based on active category
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (activeCategory === 'all') {
        setResources(resourcesData);
      } else {
        const filteredResources = resourcesData.filter(
          resource => resource.category === activeCategory
        );
        setResources(filteredResources);
      }
      setIsLoading(false);
    }, 800);
  }, [activeCategory]);

  const categories = [
    { id: 'all', name: 'All Resources', icon: '📚' },
    { id: 'exercises', name: 'Exercises', icon: '💪' },
    { id: 'meditation', name: 'Meditation', icon: '🧘‍♂️' },
    { id: 'articles', name: 'Articles', icon: '📖' },
    { id: 'sleep', name: 'Sleep', icon: '🌙' }
  ];

  return (
    <div className="resources-page">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <Heart className="logo-icon" />
            <span>MindCare</span>
          </div>
          <nav className="nav">
            <a href="/" className="nav-link">Home</a>
            <a href="/chatbot" className="nav-link">Support</a>
            {/* <a href="/resources" className="nav-link">Resources</a> */}
            <a href="#community" className="nav-link">Community</a>
            <button className="emergency-btn">
              <Phone size={18} />
              Emergency Help
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="resources-hero-section">
        <div className="resources-hero-content">
          <h1 className="resources-hero-title">Mental Wellness Resources</h1>
          <p className="resources-hero-subtitle">
            Discover tools and techniques to manage stress, improve focus, and enhance your wellbeing
          </p>
          <div className="resources-hero-buttons">
            <button className="primary-btn">
              Explore All Resources
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
        <div className="resources-floating-shapes">
          <div className="resources-shape resources-shape-1"></div>
          <div className="resources-shape resources-shape-2"></div>
          <div className="resources-shape resources-shape-3"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="resources-main-content">
        <div className="resources-categories-section">
          <h2 className="resources-section-title">Browse by Category</h2>
          <div className="resources-categories-grid">
            {categories.map(category => (
              <div 
                key={category.id}
                className={`resources-category-card ${activeCategory === category.id ? 'resources-active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <div className="resources-category-icon">{category.icon}</div>
                <h3 className="resources-category-name">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="resources-list-section">
          <h2 className="resources-section-title">
            {activeCategory === 'all' ? 'All Resources' : 
             categories.find(cat => cat.id === activeCategory)?.name}
          </h2>
          
          {isLoading ? (
            <div className="resources-loading-container">
              <div className="resources-loading-spinner"></div>
              <p>Loading resources...</p>
            </div>
          ) : (
            <div className="resources-grid">
              {resources.map(resource => (
                <div key={resource.id} className="resources-card">
                  <div className="resources-card-header">
                    <div className="resources-card-icon">{resource.icon}</div>
                    <div className="resources-card-type">{resource.type}</div>
                  </div>
                  <h3 className="resources-card-title">{resource.title}</h3>
                  <p className="resources-card-description">{resource.description}</p>
                  <div className="resources-card-footer">
                    <span className="resources-card-duration">{resource.duration}</span>
                    <button className="resources-card-button">Explore</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Inspiration Section */}
      <div className="resources-inspiration-section">
        <div className="resources-inspiration-content">
          <h2>Your mental health matters</h2>
          <p>Take small steps every day towards better wellbeing. You're not alone in this journey.</p>
          <div className="resources-inspiration-quote">
            <p>"The greatest wealth is health." - Virgil</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Heart size={24} />
              <span>MindCare</span>
            </div>
            <p>Supporting student mental health with care, confidentiality, and compassion.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Help</h4>
            <ul>
              <li><a href="#crisis">Crisis Support</a></li>
              <li><a href="/chatbot">AI Chat</a></li>
              <li><a href="#book">Book Session</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="/resources">Self-Help Guides</a></li>
              <li><a href="#videos">Wellness Videos</a></li>
              <li><a href="#community">Community</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <div className="emergency-contact">
              <Phone size={18} />
              <span>24/7 Crisis Line: 1800-XXX-XXXX</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 MindCare. Your privacy and wellbeing are our priority.</p>
        </div>
      </footer>
    </div>
  );
};

export default Resources;