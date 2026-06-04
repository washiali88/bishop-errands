import './App.css';
import { useState } from 'react';

function App() {
  const [showDonate, setShowDonate] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDonateClick = (e) => {
    e.preventDefault();
    setShowDonate(!showDonate);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('williamamukowa699@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app">

      {/* BUBBLES */}
      <div className="bubbles">
        {[...Array(12)].map((_, i) => (
          <div className="bubble" key={i}></div>
        ))}
      </div>

      {/* HERO */}
      <section className="hero">
        <h1 className="hero-title">MAN FOR HIRE</h1>
      </section>

      {/* DONATE POPUP */}
      {showDonate && (
        <div className="donate-popup-overlay" onClick={() => setShowDonate(false)}>
          <div className="donate-popup" onClick={(e) => e.stopPropagation()}>
            <div className="donate-popup-header">
              <i className="fab fa-paypal"></i>
              <span>PayPal Donation</span>
            </div>
            <p>To donate, please send to:</p>
            <div className="donate-email" onClick={handleCopy}>
              <i className="fas fa-envelope"></i>
              williamwesa88@gmail.com
              <i className={`fas ${copied ? 'fa-check' : 'fa-copy'} copy-icon`}></i>
            </div>
            {copied && <span className="copied-msg">Copied!</span>}
            <p className="donate-note">Click the email above to copy, then paste it in your PayPal app. Thank you! 💛</p>
            <button className="donate-close" onClick={() => setShowDonate(false)}>Got it</button>
          </div>
        </div>
      )}

      {/* MAIN SECTION */}
      <section className="main">
        <div className="left">
          <h2 className="fade-in">Need something fixed, built, or figured out?</h2>
          <p className="fade-in-delay">Whether it needs Research, figuring out, or building from scratch — I show up and get it done so you don't have to stress.</p>
          <div className="services">
            <span className="bubble-pop"><i className="fas fa-truck"></i> Delivery & Pickup</span>
            <span className="bubble-pop"><i className="fas fa-search"></i> Research & Information Hunting</span>
            <span className="bubble-pop"><i className="fas fa-random"></i> Stuck on a Decision? I'll Decide for You</span>
            <span className="bubble-pop"><i className="fas fa-shopping-bag"></i> Shopping on Your Behalf</span>
            <span className="bubble-pop"><i className="fas fa-clock"></i> Accountability Ghost — Watch Your Screen Time While You Work</span>
            <span className="bubble-pop"><i className="fas fa-calendar-check"></i> Booking & Reservations</span>
            <span className="bubble-pop"><i className="fas fa-handshake"></i> A Friend to Talk To ?</span>
            <span className="bubble-pop"><i className="fas fa-file-alt"></i> Document Runs</span>
            <span className="bubble-pop"><i className="fas fa-eye"></i> Second Pair of Eyes on Sketchy Marketplace Deals</span>
            <span className="bubble-pop"><i className="fas fa-laptop"></i> Virtual Assistance</span>
            <span className="bubble-pop"><i className="fas fa-user-friends"></i> Be Your Plus-One to an Event</span>           
            <span className="bubble-pop"><i className="fas fa-gift"></i> Send a Thoughtful Gift on Your Behalf</span>
            <span className="bubble-pop"><i className="fas fa-heart"></i> Check on a Family Member</span>
            <span className="bubble-pop"><i className="fas fa-motorcycle"></i> Deliver Something to a Loved One</span>
            <span className="bubble-pop"><i className="fas fa-tasks"></i> Run a Family Errand Remotely</span>
            <span className="bubble-pop"><i className="fas fa-utensils"></i> Hunt Down the Best Local Food Spot</span>
            <span className="bubble-pop"><i className="fas fa-comment-dots"></i> Need Someone to Tell You the Truth? I Will</span>
            <span className="bubble-pop"><i className="fas fa-paw"></i> I'll Name Your Pet, Business, or Baby</span>           
            <span className="bubble-pop"><i className="fas fa-book-open"></i> Tell You a Made-Up Bedtime Story Over Voice Note</span>
            <span className="bubble-pop"><i className="fas fa-cloud-moon"></i> Walk With You in Silence — No Talking Needed</span>
            <span className="bubble-pop"><i className="fas fa-unlock-alt"></i> Be the Person You Finally Confess Something To</span>
            <span className="bubble-pop"><i className="fas fa-gavel"></i> Neutral Friend in a Petty Argument — I'll Declare a Winner</span>            
            <span className="bubble-pop"><i className="fas fa-bullhorn"></i> Monday Morning Goal Reminder — Aggressive Motivation</span>
            <span className="bubble-pop"><i className="fas fa-dice"></i> Life Roulette — I Pick, You Do</span>
            <span className="bubble-pop"><i className="fas fa-cloud-moon"></i> Sit in Silence Together — No Talking, Just Existing</span>
            <span className="bubble-pop"><i className="fas fa-star"></i> Be the First Person You Tell Your Big News To</span>
            <span className="bubble-pop"><i className="fas fa-trophy"></i> Celebrate Your Small Wins — I'll Clap Like It's a Grammy</span>
          </div>

          {/* OPEN INVITE SECTION */}
          <div className="invite-inner slide-up">
            <i className="fas fa-door-open invite-icon pulse-icon"></i>
            <h2>Open to Everything</h2>
            <p>
              No agenda. No filter. Just two people figuring things out.
              Maybe you just want to talk — about life, a project, a dream, or something
              that's been sitting in your head. I'm here for all of it.
              Got a wild idea? A story to tell? Something you want to build, test, or try?
              Want to grab dinner, cook something together, or just share a meal and good conversation?
              Whatever it is — I'm open to it.
            </p>
          </div>

          <p className="hero-sub">Not just a helper — your guy. Call me when life gets weird, busy, broken, or you just need a human to figure it out.</p>
        </div>

        <div className="right">
          <img src="/photo.jpg" alt="Bishop" className="profile-img" />
          <div className="profile">
            <p className="profile-name">William Wesa</p>
            <p className="profile-detail"><i className="fas fa-map-marker-alt"></i> Nairobi, Kenya</p>
            <p className="profile-detail"><i className="fas fa-birthday-cake"></i> 24 years old</p>
          </div>

          {/* BOOK NOW BUTTON */}
          <a href="https://wa.me/254113839926" className="book-now-btn">
            <i className="fas fa-calendar-check"></i> Book Now
          </a>

          <div className="contact">
            <a href="https://wa.me/254113839926">
              <i className="fab fa-whatsapp"></i> +254 113 839 926
            </a>
            <a href="tel:+254113839926">
              <i className="fas fa-phone"></i> +254 113 839 926
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT ME */}
      <section className="about">
        <h2>About Me</h2>
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
              <li><i className="fas fa-times"></i> Anything involving drugs — hard no, not my vibe</li>
              <li><i className="fas fa-times"></i> Dangerous & risky tasks — I like being alive</li>
              <li><i className="fas fa-times"></i> Unethical requests — my mama raised me right</li>
              <li><i className="fas fa-times"></i> Anything illegal — I look terrible in handcuffs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* DONATE AT BOTTOM */}
      <section className="donate-bottom">
        <button className="donate-header" onClick={handleDonateClick}>
          <i className="fab fa-paypal"></i> Donate via PayPal
        </button>
      </section>

    </div>
  );
}

export default App;