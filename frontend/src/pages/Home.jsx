//Home.jsx
import React, { useState, useEffect } from 'react';
import { Heart, Users, Shield, MessageCircle, BookOpen, Calendar, Phone, ArrowRight, Star, Zap } from 'lucide-react';
import './Home.css';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('inhale');

  useEffect(() => {
    setIsVisible(true);
    
    // Breathing animation cycle
    const breathingInterval = setInterval(() => {
      setBreathingPhase(prev => prev === 'inhale' ? 'exhale' : 'inhale');
    }, 4000);

    return () => clearInterval(breathingInterval);
  }, []);

  const features = [
    {
      icon: <MessageCircle size={24} />,
      title: "AI-Guided Support",
      description: "Get instant, confidential support whenever you need it"
    },
    {
      icon: <Calendar size={24} />,
      title: "Easy Booking",
      description: "Schedule sessions with counselors privately and securely"
    },
    {
      icon: <BookOpen size={24} />,
      title: "Resource Hub",
      description: "Access videos, guides, and tools in your preferred language"
    },
    {
      icon: <Users size={24} />,
      title: "Peer Support",
      description: "Connect with fellow students who understand your journey"
    }
  ];

  const stats = [
    { number: "10K+", label: "Students Supported" },
    { number: "95%", label: "Report Feeling Better" },
    { number: "24/7", label: "Always Available" },
    { number: "100%", label: "Confidential & Safe" }
  ];

  return (
    <div className="home-container">
      {/* Floating Background Elements */}
      <div className="floating-shapes">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
        <div className="floating-circle circle-4"></div>
        <div className="floating-circle circle-5"></div>
        <div className="floating-circle circle-6"></div>
        {/* <div className="floating-triangle triangle-1"></div>
        <div className="floating-triangle triangle-2"></div> */}
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <Heart className="logo-icon" />
            <span>MindCare</span>
          </div>
          <nav className="nav">
            <a href="/chatbot" className="nav-link">Support</a>
            <a href="/resources" className="nav-link">Resources</a>
            <a href="/booking" className="nav-link">Book Session</a>
            <button className="emergency-btn">
              <Phone size={18} />
              Emergency Help
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`hero-section ${isVisible ? 'visible' : ''}`}>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              You're Not Alone in This
              <span className="title-highlight"> Journey</span>
            </h1>
            <p className="hero-description">
              A safe, confidential space where students find support, resources, and connection. 
              Your mental health matters, and help is just one click away.
            </p>
            <div className="hero-buttons">
              <button className="primary-btn">
                Get Support Now
                <ArrowRight size={20} />
              </button>
              <button className="secondary-btn">
                <a href="/resources" >Explore Resources</a>
                {/* Explore Resources */}
              </button>
            </div>
          </div>
          
          {/* Breathing Guide */}
          <div className="breathing-guide">
            <div className={`breathing-circle ${breathingPhase}`}>
              <div className="breathing-inner">
                <span className="breathing-text">
                  {breathingPhase === 'inhale' ? 'Breathe In' : 'Breathe Out'}
                </span>
              </div>
            </div>
            <p className="breathing-instruction">
              Follow the circle to calm your mind
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">How We Support You</h2>
            <p className="section-description">
              Comprehensive mental health support designed specifically for students
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="section-container">
          <h2 className="stats-title">Making a Real Difference</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">What Students Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#EA3546" color="#EA3546" />)}
              </div>
              <p className="testimonial-text">
                "This platform helped me during my most stressful semester. The AI support was there when I needed it most."
              </p>
              <div className="testimonial-author">- Anonymous Student</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#EA3546" color="#EA3546" />)}
              </div>
              <p className="testimonial-text">
                "Finally, a place where I can get help without judgment. The peer support community is amazing."
              </p>
              <div className="testimonial-author">- Anonymous Student</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#EA3546" color="#EA3546" />)}
              </div>
              <p className="testimonial-text">
                "The resources and counselor booking system made seeking help so much easier and less intimidating."
              </p>
              <div className="testimonial-author">- Anonymous Student</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <Shield className="cta-icon" size={48} />
          <h2 className="cta-title">Ready to Start Your Wellness Journey?</h2>
          <p className="cta-description">
            Join thousands of students who've found support, hope, and healing through our platform.
          </p>
          <div className="cta-buttons">
            <button className="primary-btn large">
              <Zap size={20} />
              Start Now - It's Free
            </button>
            <button className="text-btn">
              Learn More About Privacy
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

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
              <li><a href="#chat">AI Chat</a></li>
              <li><a href="#book">Book Session</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#guides">Self-Help Guides</a></li>
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

export default Home;