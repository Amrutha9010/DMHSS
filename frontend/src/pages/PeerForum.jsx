// PeerForum.jsx
import React, { useState, useEffect, useRef } from 'react';
import './PeerForum.css';

const PeerForum = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [commentAnonymous, setCommentAnonymous] = useState(true);
  
  // New post form state
  const [newPost, setNewPost] = useState({
    title: '',
    message: '',
    category: 'stress'
  });

  // Categories
  const categories = [
    { id: 'all', name: 'All Topics', emoji: '📚' },
    { id: 'stress', name: 'Stress', emoji: '😥' },
    { id: 'exams', name: 'Exams', emoji: '📝' },
    { id: 'motivation', name: 'Motivation', emoji: '💪' },
    { id: 'relationships', name: 'Relationships', emoji: '👥' },
    { id: 'sleep', name: 'Sleep', emoji: '😴' },
    { id: 'general', name: 'General', emoji: '💬' }
  ];

  // Sample initial posts
  useEffect(() => {
    const samplePosts = [
      {
        id: 1,
        title: "Feeling overwhelmed with finals",
        content: "I have 5 exams next week and I'm feeling completely overwhelmed. How do you all manage your study schedule without burning out? Any tips would be really appreciated right now.",
        author: "Anonymous",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        category: "exams",
        likes: 12,
        comments: [
          {
            id: 1,
            content: "Try the Pomodoro technique! 25 min study, 5 min break. It really helps prevent burnout.",
            author: "Anonymous",
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
            likes: 5
          }
        ],
        liked: false
      },
      {
        id: 2,
        title: "You're not alone in this",
        content: "Just wanted to remind everyone that it's completely okay to not be okay sometimes. We're all going through challenges, and sharing them makes them easier to bear. You've got this! 💙",
        author: "SupportivePeer",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        category: "motivation",
        likes: 24,
        comments: [
          {
            id: 1,
            content: "Thank you for this. Really needed to hear it today.",
            author: "Anonymous",
            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
            likes: 3
          }
        ],
        liked: false
      },
      {
        id: 3,
        title: "Anxiety before presentations",
        content: "Does anyone have tips for dealing with anxiety before presentations? My heart races and I can't think clearly whenever I have to speak in front of the class.",
        author: "Anonymous",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        category: "stress",
        likes: 7,
        comments: [],
        liked: false
      }
    ];
    
    setPosts(samplePosts);
    setFilteredPosts(samplePosts);
  }, []);

  // Filter posts based on search and category
  useEffect(() => {
    let filtered = posts;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.content.toLowerCase().includes(query)
      );
    }
    
    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory, posts]);

  // Handle creating a new post
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.message.trim()) return;

    const post = {
      id: posts.length + 1,
      title: newPost.title,
      content: newPost.message,
      author: isAnonymous ? "Anonymous" : "You",
      timestamp: new Date(),
      category: newPost.category,
      likes: 0,
      comments: [],
      liked: false
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', message: '', category: 'stress' });
    setShowCreateModal(false);
  };

  // Handle liking a post
  const handleLikePost = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  // Handle adding a comment
  const handleAddComment = (postId, e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Math.floor(Math.random() * 1000),
      content: newComment,
      author: commentAnonymous ? "Anonymous" : "You",
      timestamp: new Date(),
      likes: 0
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [comment, ...post.comments]
        };
      }
      return post;
    }));

    setNewComment('');
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="peer-forum">
      {/* Animated Background Elements */}
      <div className="background-animation">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
      </div>

      {/* Header Section */}
      <header className="forum-header">
        <div className="header-content">
          <div className="header-title">
            <h1 className="pulse-glow">Peer Support Forum 💬</h1>
            <p className="encouragement">Remember, you are not alone 🌼</p>
          </div>
          
          <div className="header-controls">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
            
            <button 
              className="create-post-btn glow-effect"
              onClick={() => setShowCreateModal(true)}
            >
              ➕ Create Post
            </button>
            
            <div className="user-controls">
              <label className="anonymous-toggle">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={() => setIsAnonymous(!isAnonymous)}
                />
                <span className="toggle-slider"></span>
                <span className="toggle-label">Anonymous</span>
              </label>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filters */}
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="category-emoji">{category.emoji}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Main Feed */}
      <main className="forum-main">
        {filteredPosts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💭</div>
            <h3>No posts yet</h3>
            <p>Be the first to share your thoughts with the community!</p>
            <button 
              className="create-first-post glow-effect"
              onClick={() => setShowCreateModal(true)}
            >
              Share Your Thoughts
            </button>
          </div>
        ) : (
          <div className="posts-grid">
            {filteredPosts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                index={index}
                onLike={handleLikePost}
                onSelect={setSelectedPost}
                formatTime={formatTime}
              />
            ))}
          </div>
        )}
      </main>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="create-post-modal slide-in">
            <div className="modal-header">
              <h2>Create New Post</h2>
              <button 
                className="close-modal"
                onClick={() => setShowCreateModal(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleCreatePost}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  placeholder="What's on your mind?"
                  maxLength="100"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Message</label>
                <textarea
                  value={newPost.message}
                  onChange={(e) => setNewPost({...newPost, message: e.target.value})}
                  placeholder="Share your thoughts, questions, or experiences..."
                  rows="6"
                  maxLength="1000"
                  required
                />
                <div className="char-count">{newPost.message.length}/1000</div>
              </div>
              
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                >
                  {categories.filter(cat => cat.id !== 'all').map(category => (
                    <option key={category.id} value={category.id}>
                      {category.emoji} {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-options">
                <label className="anonymous-option">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={() => setIsAnonymous(!isAnonymous)}
                  />
                  <span>Post Anonymously</span>
                </label>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="submit-btn glow-effect"
                  >
                    Share Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post Detail View */}
      {selectedPost && (
        <div className="modal-overlay">
          <div className="post-detail-modal slide-in">
            <div className="modal-header">
              <button 
                className="back-btn"
                onClick={() => setSelectedPost(null)}
              >
                ← Back to Forum
              </button>
              <button 
                className="close-modal"
                onClick={() => setSelectedPost(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="post-detail">
              <div className="post-header">
                <div className="post-meta">
                  <span className="post-author">{selectedPost.author}</span>
                  <span className="post-time">{formatTime(selectedPost.timestamp)}</span>
                  <span className={`post-category ${selectedPost.category}`}>
                    {categories.find(c => c.id === selectedPost.category)?.emoji} 
                    {categories.find(c => c.id === selectedPost.category)?.name}
                  </span>
                </div>
              </div>
              
              <h2 className="post-title">{selectedPost.title}</h2>
              <div className="post-content">{selectedPost.content}</div>
              
              <div className="post-actions">
                <button 
                  className={`like-btn ${selectedPost.liked ? 'liked' : ''}`}
                  onClick={() => handleLikePost(selectedPost.id)}
                >
                  ❤️ {selectedPost.likes}
                </button>
                <button className="report-btn">🚨 Report</button>
              </div>
              
              <div className="comments-section">
                <h3>Comments ({selectedPost.comments.length})</h3>
                
                <form onSubmit={(e) => handleAddComment(selectedPost.id, e)} className="comment-form">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a supportive comment..."
                    rows="3"
                  />
                  <div className="comment-options">
                    <label className="anonymous-option">
                      <input
                        type="checkbox"
                        checked={commentAnonymous}
                        onChange={() => setCommentAnonymous(!commentAnonymous)}
                      />
                      <span>Post Anonymously</span>
                    </label>
                    <button type="submit" className="submit-comment glow-effect">Post Comment</button>
                  </div>
                </form>
                
                <div className="comments-list">
                  {selectedPost.comments.map(comment => (
                    <div key={comment.id} className="comment-card">
                      <div className="comment-header">
                        <span className="comment-author">{comment.author}</span>
                        <span className="comment-time">{formatTime(comment.timestamp)}</span>
                      </div>
                      <div className="comment-content">{comment.content}</div>
                      <button className="comment-like">👍 {comment.likes}</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Post Card Component
const PostCard = ({ post, index, onLike, onSelect, formatTime }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = `${index * 100}ms`;
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className="post-card"
      onClick={() => onSelect(post)}
    >
      <div className="card-header">
        <div className="post-meta">
          <span className="post-author">{post.author}</span>
          <span className="post-time">{formatTime(post.timestamp)}</span>
        </div>
        <span className={`post-category ${post.category}`}>
          {post.category}
        </span>
      </div>
      
      <h3 className="post-title">{post.title}</h3>
      <div className="post-preview">
        {post.content.length > 120 
          ? `${post.content.substring(0, 120)}...` 
          : post.content
        }
      </div>
      
      <div className="card-footer">
        <div className="post-stats">
          <span className="likes-count">❤️ {post.likes}</span>
          <span className="comments-count">💬 {post.comments.length}</span>
        </div>
        <button className="read-more">Read More →</button>
      </div>
    </div>
  );
};

export default PeerForum;