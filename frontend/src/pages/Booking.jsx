import React, { useState, useEffect } from 'react';
import { Heart, Phone, Calendar, Clock, User, Shield, MessageCircle, Video, MapPin, Star, CheckCircle, ArrowRight, Zap } from 'lucide-react';
import './Booking.css';

const Booking = () => {
  const [activeTab, setActiveTab] = useState('book');
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingStep, setBookingStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Sample counselors data
  const counselors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialization: "Anxiety & Stress Management",
      experience: "8 years",
      rating: 4.9,
      reviews: 127,
      languages: ["English", "Hindi", "Telugu"],
      availability: ["Mon", "Wed", "Fri"],
      image: "👩‍⚕️",
      bio: "Specialized in helping students manage academic stress and anxiety disorders."
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialization: "Career Counseling & Motivation",
      experience: "12 years",
      rating: 4.8,
      reviews: 89,
      languages: ["English", "Hindi", "Tamil"],
      availability: ["Tue", "Thu", "Sat"],
      image: "👨‍⚕️",
      bio: "Expert in career guidance and helping students find their true potential."
    },
    {
      id: 3,
      name: "Ms. Ananya Patel",
      specialization: "Relationship & Peer Issues",
      experience: "6 years",
      rating: 4.7,
      reviews: 64,
      languages: ["English", "Hindi", "Gujarati"],
      availability: ["Mon", "Tue", "Thu", "Fri"],
      image: "🧑‍⚕️",
      bio: "Focused on helping students navigate relationships and social challenges."
    },
    {
      id: 4,
      name: "Dr. Michael Chen",
      specialization: "Sleep Disorders & Mindfulness",
      experience: "10 years",
      rating: 4.9,
      reviews: 93,
      languages: ["English", "Mandarin"],
      availability: ["Wed", "Thu", "Sat"],
      image: "👨‍💼",
      bio: "Specialist in sleep hygiene and mindfulness techniques for better mental health."
    }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    concern: '',
    preference: 'video',
    anonymous: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBookSession = (counselor) => {
    setSelectedCounselor(counselor);
    setBookingStep(2);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setBookingStep(3);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setBookingStep(4);
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setBookingStep(5);
    }, 2000);
  };

  const resetBooking = () => {
    setSelectedCounselor(null);
    setSelectedDate('');
    setSelectedTime('');
    setBookingStep(1);
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      concern: '',
      preference: 'video',
      anonymous: false
    });
  };

  return (
    <div className="booking-page">
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
            <a href="/resources" className="nav-link">Resources</a>
            {/* <a href="/booking" className="nav-link">Book Session</a> */}
            <button className="emergency-btn">
              <Phone size={18} />
              Emergency Help
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="booking-hero-section">
        <div className="booking-hero-content">
          <h1 className="booking-hero-title">
            Professional Counseling Support
          </h1>
          <p className="booking-hero-subtitle">
            Book confidential sessions with experienced counselors. Your privacy and wellbeing are our top priority.
          </p>
          <div className="booking-hero-features">
            <div className="feature-item">
              <Shield size={20} />
              <span>100% Confidential</span>
            </div>
            <div className="feature-item">
              <Calendar size={20} />
              <span>Flexible Scheduling</span>
            </div>
            <div className="feature-item">
              <User size={20} />
              <span>Expert Counselors</span>
            </div>
          </div>
        </div>
        <div className="booking-floating-shapes">
          <div className="booking-shape booking-shape-1"></div>
          <div className="booking-shape booking-shape-2"></div>
          <div className="booking-shape booking-shape-3"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="booking-main-content">
        {/* Tab Navigation */}
        <div className="booking-tabs">
          <button 
            className={`booking-tab ${activeTab === 'book' ? 'active' : ''}`}
            onClick={() => setActiveTab('book')}
          >
            <Calendar size={20} />
            Book Session
          </button>
          <button 
            className={`booking-tab ${activeTab === 'support' ? 'active' : ''}`}
            onClick={() => setActiveTab('support')}
          >
            <MessageCircle size={20} />
            Quick Support
          </button>
        </div>

        {activeTab === 'book' && (
          <div className="booking-process">
            {/* Step 1: Counselor Selection */}
            {bookingStep === 1 && (
              <div className="booking-step">
                <h2 className="step-title">Choose Your Counselor</h2>
                <p className="step-description">
                  Select from our team of experienced mental health professionals
                </p>
                <div className="counselors-grid">
                  {counselors.map(counselor => (
                    <div key={counselor.id} className="counselor-card">
                      <div className="counselor-header">
                        <div className="counselor-image">{counselor.image}</div>
                        <div className="counselor-info">
                          <h3 className="counselor-name">{counselor.name}</h3>
                          <p className="counselor-specialization">{counselor.specialization}</p>
                          <div className="counselor-rating">
                            <Star size={16} fill="#FFD700" color="#FFD700" />
                            <span>{counselor.rating} ({counselor.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                      <div className="counselor-details">
                        <p className="counselor-experience">
                          <Clock size={16} />
                          {counselor.experience} experience
                        </p>
                        <p className="counselor-languages">
                          Languages: {counselor.languages.join(', ')}
                        </p>
                        <p className="counselor-availability">
                          Available: {counselor.availability.join(', ')}
                        </p>
                        <p className="counselor-bio">{counselor.bio}</p>
                      </div>
                      <button 
                        className="book-counselor-btn"
                        onClick={() => handleBookSession(counselor)}
                      >
                        Book Session
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Date Selection */}
            {bookingStep === 2 && selectedCounselor && (
              <div className="booking-step">
                <div className="step-header">
                  <button className="back-btn" onClick={() => setBookingStep(1)}>
                    ← Back
                  </button>
                  <h2 className="step-title">Select Date</h2>
                  <div className="selected-counselor">
                    With {selectedCounselor.name}
                  </div>
                </div>
                
                <div className="date-selection">
                  <h3>Available Dates</h3>
                  <div className="dates-grid">
                    {['2024-12-20', '2024-12-21', '2024-12-23', '2024-12-24', '2024-12-27', '2024-12-28'].map(date => (
                      <button
                        key={date}
                        className={`date-option ${selectedDate === date ? 'selected' : ''}`}
                        onClick={() => handleDateSelect(date)}
                      >
                        <div className="date-day">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                        <div className="date-number">{new Date(date).getDate()}</div>
                        <div className="date-month">{new Date(date).toLocaleDateString('en-US', { month: 'short' })}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Time Selection */}
            {bookingStep === 3 && selectedCounselor && (
              <div className="booking-step">
                <div className="step-header">
                  <button className="back-btn" onClick={() => setBookingStep(2)}>
                    ← Back
                  </button>
                  <h2 className="step-title">Select Time</h2>
                  <div className="selected-info">
                    {selectedDate} with {selectedCounselor.name}
                  </div>
                </div>
                
                <div className="time-selection">
                  <h3>Available Time Slots</h3>
                  <div className="times-grid">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        className={`time-option ${selectedTime === time ? 'selected' : ''}`}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Booking Form */}
            {bookingStep === 4 && selectedCounselor && (
              <div className="booking-step">
                <div className="step-header">
                  <button className="back-btn" onClick={() => setBookingStep(3)}>
                    ← Back
                  </button>
                  <h2 className="step-title">Complete Booking</h2>
                  <div className="selected-info">
                    {selectedDate} at {selectedTime} with {selectedCounselor.name}
                  </div>
                </div>

                <form className="booking-form" onSubmit={handleSubmitBooking}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={bookingForm.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={bookingForm.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={bookingForm.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="concern">What would you like to discuss? *</label>
                    <textarea
                      id="concern"
                      name="concern"
                      value={bookingForm.concern}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      placeholder="Briefly describe what you'd like to work on in the session..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Session Preference</label>
                    <div className="preference-options">
                      <label className="preference-option">
                        <input
                          type="radio"
                          name="preference"
                          value="video"
                          checked={bookingForm.preference === 'video'}
                          onChange={handleInputChange}
                        />
                        <Video size={18} />
                        Video Call
                      </label>
                      <label className="preference-option">
                        <input
                          type="radio"
                          name="preference"
                          value="audio"
                          checked={bookingForm.preference === 'audio'}
                          onChange={handleInputChange}
                        />
                        <Phone size={18} />
                        Audio Call
                      </label>
                      <label className="preference-option">
                        <input
                          type="radio"
                          name="preference"
                          value="in-person"
                          checked={bookingForm.preference === 'in-person'}
                          onChange={handleInputChange}
                        />
                        <MapPin size={18} />
                        In-Person
                      </label>
                    </div>
                  </div>

                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="anonymous"
                        checked={bookingForm.anonymous}
                        onChange={handleInputChange}
                      />
                      <Shield size={16} />
                      Book anonymously (your name won't be shared with the counselor)
                    </label>
                  </div>

                  <button type="submit" className="submit-booking-btn" disabled={isLoading}>
                    {isLoading ? 'Booking...' : 'Confirm Booking'}
                  </button>
                </form>
              </div>
            )}

            {/* Step 5: Confirmation */}
            {bookingStep === 5 && (
              <div className="booking-step confirmation-step">
                <div className="confirmation-content">
                  <CheckCircle size={64} className="success-icon" />
                  <h2>Booking Confirmed!</h2>
                  <p className="confirmation-message">
                    Your session with {selectedCounselor.name} has been scheduled for {selectedDate} at {selectedTime}.
                  </p>
                  <div className="confirmation-details">
                    <p><strong>Session Type:</strong> {bookingForm.preference}</p>
                    <p><strong>Meeting Link:</strong> Will be sent to your email 1 hour before the session</p>
                    <p><strong>Preparation:</strong> Find a quiet, comfortable space for your session</p>
                  </div>
                  <div className="confirmation-actions">
                    <button className="primary-btn" onClick={resetBooking}>
                      Book Another Session
                    </button>
                    <button className="secondary-btn">
                      Add to Calendar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'support' && (
          <div className="quick-support-section">
            <h2 className="support-title">Immediate Support Options</h2>
            <div className="support-options-grid">
              <div className="support-option">
                <div className="support-icon">💬</div>
                <h3>AI Chat Support</h3>
                <p>Get immediate help from our AI assistant for quick guidance and support</p>
                <button className="support-btn">
                  Start Chat <ArrowRight size={16} />
                </button>
              </div>

              <div className="support-option">
                <div className="support-icon">🆘</div>
                <h3>Emergency Hotline</h3>
                <p>24/7 crisis support for immediate assistance in urgent situations</p>
                <button className="support-btn emergency">
                  Call Now <Phone size={16} />
                </button>
              </div>

              <div className="support-option">
                <div className="support-icon">👥</div>
                <h3>Peer Support</h3>
                <p>Connect with trained student volunteers who understand what you're going through</p>
                <button className="support-btn">
                  Connect <Users size={16} />
                </button>
              </div>

              <div className="support-option">
                <div className="support-icon">📚</div>
                <h3>Self-Help Resources</h3>
                <p>Access guided exercises, articles, and tools for immediate relief</p>
                <button className="support-btn">
                  Explore <Zap size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Assurance Section */}
      <div className="assurance-section">
        <div className="assurance-content">
          <h2>Your Privacy & Safety Matters</h2>
          <div className="assurance-features">
            <div className="assurance-item">
              <Shield size={32} />
              <h3>100% Confidential</h3>
              <p>All sessions are private and protected by strict confidentiality agreements</p>
            </div>
            <div className="assurance-item">
              <User size={32} />
              <h3>Anonymous Option</h3>
              <p>Book sessions without revealing your identity if you prefer</p>
            </div>
            <div className="assurance-item">
              <CheckCircle size={32} />
              <h3>Verified Professionals</h3>
              <p>All counselors are certified and experienced in student mental health</p>
            </div>
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
              <li><a href="/booking">Book Session</a></li>
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

export default Booking;