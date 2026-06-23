import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [showDonate, setShowDonate] = useState(false);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', challenge: '', type: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [challenges, setChallenges] = useState([]);
  const [missionData, setMissionData] = useState({ current: 0, solved: 0, clients: 0, daysOn: 1 });

  const GOAL = 2000;

  // Fetch mission data from Google Sheets
  useEffect(() => {
    const url = 'https://script.google.com/macros/s/AKfycbx0V58-jaingz5IDxtBj7R4kmdXjQrtyZPExCZw_SvsUGXPi5wfeMHnznqrLDYofmrY/exec';
    const script = document.createElement('script');
    const callbackName = 'cb' + Date.now();
    
    window[callbackName] = (data) => {
      setMissionData({
        current: Number(data.current) || 0,
        solved: Number(data.solved) || 0,
        clients: Number(data.clients) || 0,
        daysOn: Number(data.daysOn) || 1,
      });
      
      const recentChallenges = [];
      Object.keys(data).forEach(key => {
        if (key.startsWith('challenge') && data[key]) {
          recentChallenges.push(data[key]);
        }
      });
      setChallenges(recentChallenges);
      
      document.head.removeChild(script);
      delete window[callbackName];
    };
    
    script.src = `${url}?callback=${callbackName}`;
    document.head.appendChild(script);
  }, []);

  const progress = Math.min((missionData.current / GOAL) * 100, 100);

  const handleDonateClick = (e) => {
    e.preventDefault();
    setShowDonate(!showDonate);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('williamwesa88@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!formData.name.trim()) {
      setFormError('Please enter your name.');
      setTimeout(() => setFormError(''), 4000);
      return;
    }
    if (!formData.contact.trim()) {
      setFormError('Please enter your contact (WhatsApp or Email).');
      setTimeout(() => setFormError(''), 4000);
      return;
    }
    if (!formData.type) {
      setFormError('Please select a challenge type.');
      setTimeout(() => setFormError(''), 4000);
      return;
    }
    if (!formData.challenge.trim()) {
      setFormError('Please describe your challenge.');
      setTimeout(() => setFormError(''), 4000);
      return;
    }
    
    setLoading(true);
    
    try {
      const res = await fetch('https://script.google.com/macros/s/AKfycbxcl0OXdUsJTAeCi-IXpBuLWuqxCTOtUsCkfIGmir3F9Va1ZQp-cW7HebJt8UA2uWa-6A/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setFormError('');
      } else {
        throw new Error('Failed');
      }
    } catch (err) {
      setFormError('Failed to send. Please try WhatsApp instead.');
      setTimeout(() => setFormError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const scrollToChallenge = () => {
    document.getElementById('submit-challenge').scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMission = () => {
    document.getElementById('mission-progress').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">

      {/* BUBBLES */}
      <div className="bubbles">
        {[...Array(10)].map((_, i) => (
          <div className="bubble" key={i}></div>
        ))}
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-eyebrow">
          <span className="live-dot"></span>
          MISSION LIVE — DAY {missionData.daysOn}
        </div>
        <h1 className="hero-title">
          I'm trying to earn my first<br />
          <span className="hero-amount">$2,000</span><br />
          solving problems for strangers.
        </h1>
        <p className="hero-sub">
          <span className="surgery-line">❤️ Every dollar goes to my father's surgery.</span>
          Need something researched, organized, found, booked, compared, delivered, or figured out?<br />
          Send me your challenge.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={scrollToChallenge}>
            <i className="fas fa-bolt"></i> Give Me A Challenge
          </button>
          <button className="btn-secondary" onClick={scrollToMission}>
            <i className="fas fa-chart-line"></i> Follow The Mission
          </button>
        </div>
      </section>

      {/* MISSION PROGRESS */}
      <section className="mission-progress" id="mission-progress">
        <div className="mission-header">
          <h2>Mission Progress — Father's Surgery Fund</h2>
          <span className="mission-tag">${missionData.current.toLocaleString()} / ${GOAL.toLocaleString()}</span>
        </div>

        <div className="progress-bar-wrap">
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="progress-label">{progress.toFixed(1)}%</span>
        </div>

        <div className="mission-stats">
          <div className="stat-card">
            <span className="stat-number">{missionData.solved}</span>
            <span className="stat-label">Problems Solved</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{missionData.clients}</span>
            <span className="stat-label">Clients Helped</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">${missionData.current.toLocaleString()}</span>
            <span className="stat-label">Raised So Far</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{missionData.daysOn}</span>
            <span className="stat-label">Days On Mission</span>
          </div>
        </div>
      </section>

      {/* WHY THIS EXISTS */}
      <section className="why-section">
        <div className="why-inner">
          <div className="why-text">
            <span className="section-eyebrow">Why This Exists</span>
            <h2>Most tasks are too small for agencies, too complicated for automation, and too annoying to do yourself.</h2>
            <p>
              Bishop Errands exists to handle those tasks. If a problem can be solved with effort, research,
              organization, communication, or persistence — it belongs here. Every dollar earned goes straight to my father's surgery fund.
            </p>
            <p className="positioning">
              Not a freelancer. Not a virtual assistant. Not an agency.<br />
              <strong>Just a son on a mission to save his father, one problem at a time.</strong>
            </p>
          </div>
          <div className="why-types">
            {[
              { icon: 'fas fa-search', label: 'Research Tasks' },
              { icon: 'fas fa-balance-scale', label: 'Comparison Tasks' },
              { icon: 'fas fa-store', label: 'Finding Suppliers' },
              { icon: 'fas fa-calendar-check', label: 'Booking Assistance' },
              { icon: 'fas fa-laptop', label: 'Virtual Assistance' },
              { icon: 'fas fa-random', label: 'Decision Support' },
              { icon: 'fas fa-shopping-bag', label: 'Shopping Assistance' },
              { icon: 'fas fa-file-alt', label: 'Admin Tasks' },
              { icon: 'fas fa-lightbulb', label: 'General Problem Solving' },
            ].map((item, i) => (
              <div className="why-tag" key={i}>
                <i className={item.icon}></i> {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT CHALLENGES */}
      <section className="recent-section">
        <span className="section-eyebrow center">Recent Challenges</span>
        <h2 className="section-title center">The Journey So Far</h2>
        {challenges.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-flag"></i>
            <p>No challenges solved yet. Be the first to send one.</p>
            <button className="btn-primary small" onClick={scrollToChallenge}>Send a Challenge</button>
          </div>
        ) : (
          <div className="challenge-list">
            {challenges.map((ch, i) => (
              <div className="challenge-row" key={i}>
                <span className="challenge-badge">Challenge {i + 1}</span>
                <span className="challenge-text">{ch}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SUBMIT CHALLENGE */}
      <section className="submit-section" id="submit-challenge">
        <div className="submit-inner">
          <span className="section-eyebrow">Submit A Challenge</span>
          <h2>Got a problem? Send it.</h2>
          <p className="submit-desc">Every challenge is reviewed. If I can solve it, I'll take it on and document the result. Your support helps fund my father's surgery.</p>

          {submitted ? (
            <div className="success-msg">
              <i className="fas fa-check-circle"></i>
              <h3>Challenge received!</h3>
              <p>Thank you for being part of this journey. I'll review it and get back to you soon.</p>
            </div>
          ) : (
            <div className="challenge-form">
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  placeholder="What should I call you?"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Contact (WhatsApp / Email)</label>
                <input
                  type="text"
                  placeholder="How do I reach you?"
                  value={formData.contact}
                  onChange={e => setFormData({ ...formData, contact: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Challenge Type</label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="">Select a category</option>
                  <option>Research</option>
                  <option>Comparison</option>
                  <option>Booking & Reservations</option>
                  <option>Shopping</option>
                  <option>Virtual Assistance</option>
                  <option>Decision Support</option>
                  <option>Finding Suppliers</option>
                  <option>Admin & Documents</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Describe your challenge</label>
                <textarea
                  placeholder="What do you need solved? Be as specific as possible."
                  rows={5}
                  value={formData.challenge}
                  onChange={e => setFormData({ ...formData, challenge: e.target.value })}
                />
              </div>

              {formError && (
                <div className="form-error">
                  <i className="fas fa-exclamation-circle"></i> {formError}
                </div>
              )}

              <div className="form-row">
                <button className="btn-primary full" onClick={handleSubmit} disabled={loading}>
                  {loading ? (
                    <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                  ) : (
                    <><i className="fas fa-paper-plane"></i> Submit Challenge</>
                  )}
                </button>
                <a href="https://wa.me/254113839926" className="btn-whatsapp full" target="_blank" rel="noreferrer">
                  <i className="fab fa-whatsapp"></i> Or Message on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ABOUT ME */}
      <section className="about">
        <span className="section-eyebrow center">The Person Behind The Mission</span>
        <h2 className="section-title center">About Me</h2>

        <div className="about-profile">
          <img src="/photo.jpg" alt="Bishop" className="profile-img" />
          <div className="profile-details">
            <p className="profile-name">William Wesa</p>
            <p className="profile-detail"><i className="fas fa-map-marker-alt"></i> Nairobi, Kenya</p>
            <p className="profile-detail"><i className="fas fa-birthday-cake"></i> 24 years old</p>
            <p className="profile-detail"><i className="fas fa-heart" style={{color: 'var(--red)'}}></i> Raising $2,000 for my father's surgery</p>
            <a href="https://wa.me/254113839926" className="btn-primary" style={{ marginTop: '12px', display: 'inline-flex' }}>
              <i className="fas fa-calendar-check"></i> Book Now
            </a>
          </div>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <h3><i className="fas fa-fire"></i> Passions</h3>
            <ul>
              <li><i className="fas fa-futbol"></i> Football Coaching</li>
              <li><i className="fas fa-gem"></i> Searching for Gems</li>
              <li><i className="fas fa-plane"></i> Travelling the World</li>
              <li><i className="fas fa-users"></i> Meeting New People</li>
            </ul>
          </div>
          <div className="about-card">
            <h3><i className="fas fa-code"></i> Skills</h3>
            <ul>
              <li><i className="fas fa-mobile-alt"></i> Web & App Development</li>
              <li><i className="fab fa-google-play"></i> Estova — on Play Store</li>
              <li><i className="fas fa-car"></i> Driving</li>
              <li><i className="fas fa-tag"></i> Pricing? Let's Talk</li>
            </ul>
          </div>
          <div className="about-card nope">
            <h3><i className="fas fa-ban"></i> The No List</h3>
            <ul>
              <li><i className="fas fa-times"></i> Anything involving drugs</li>
              <li><i className="fas fa-times"></i> Dangerous & risky tasks</li>
              <li><i className="fas fa-times"></i> Unethical requests</li>
              <li><i className="fas fa-times"></i> Anything illegal</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-name">Bishop Errands</p>
          <p className="footer-tagline">Solving problems. Saving my father. One mission.</p>
          <div className="footer-links">
            <a href="https://wa.me/254113839926"><i className="fab fa-whatsapp"></i> WhatsApp</a>
            <a href="tel:+254113839926"><i className="fas fa-phone"></i> Call</a>
            <button className="donate-footer-btn" onClick={handleDonateClick}>
              <i className="fab fa-paypal"></i> Donate
            </button>
            <button className="donate-footer-btn" onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setLinkCopied(true);
              setTimeout(() => setLinkCopied(false), 2000);
            }}>
              <i className="fas fa-share-alt"></i> {linkCopied ? 'Copied!' : 'Share'}
            </button>
          </div>
        </div>
      </footer>

      {/* DONATE POPUP */}
      {showDonate && (
        <div className="donate-popup-overlay" onClick={() => setShowDonate(false)}>
          <div className="donate-popup" onClick={(e) => e.stopPropagation()}>
            <div className="donate-popup-header">
              <i className="fab fa-paypal"></i>
              <span>Support My Father's Surgery</span>
            </div>
            <p>Every donation brings my dad closer to treatment. Send via PayPal to:</p>
            <div className="donate-email" onClick={handleCopy}>
              <i className="fas fa-envelope"></i>
              williamwesa88@gmail.com
              <i className={`fas ${copied ? 'fa-check' : 'fa-copy'} copy-icon`}></i>
            </div>
            {copied && <span className="copied-msg">Copied!</span>}
            <p className="donate-note">Click above to copy, then paste in your PayPal app. God bless you! 🙏</p>
            <button className="donate-close" onClick={() => setShowDonate(false)}>Got it</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;