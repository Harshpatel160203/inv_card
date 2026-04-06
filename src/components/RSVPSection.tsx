import { useState, useEffect } from 'react';

type RSVPType = 'yes' | 'maybe' | 'no' | null;

export default function RSVPSection() {
  const [selectedOption, setSelectedOption] = useState<RSVPType>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copyText, setCopyText] = useState('Copy Address');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = '1';
          target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.info-section').forEach((el, i) => {
      const element = el as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(24px)';
      element.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSelectOption = (type: RSVPType) => {
    setSelectedOption(type);
  };

  const handleChangeCount = (delta: number) => {
    setGuestCount(Math.max(1, Math.min(10, guestCount + delta)));
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setSubmitted(true);
  };

  const handleCopyAddress = async () => {
    const address = '123 Garden Lane, Austin, TX 78701';
    try {
      await navigator.clipboard.writeText(address);
      setIsCopied(true);
      setCopyText('✓ Copied!');
      setTimeout(() => {
        setIsCopied(false);
        setCopyText('Copy Address');
      }, 2500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleOpenMaps = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=Austin+TX', '_blank');
  };

  return (
    <section id="page2" className="page">
      <div className="ambient-circle" style={{
        width: '300px',
        height: '300px',
        top: '-80px',
        left: '-100px',
        background: 'radial-gradient(circle,rgba(138,158,140,0.12),transparent 70%)',
        ['--tx' as string]: '20px',
        ['--ty' as string]: '30px',
        animationDuration: '8s'
      }}></div>
      <div className="ambient-circle" style={{
        width: '250px',
        height: '250px',
        bottom: '-60px',
        right: '-80px',
        background: 'radial-gradient(circle,rgba(196,168,130,0.1),transparent 70%)',
        ['--tx' as string]: '-15px',
        ['--ty' as string]: '-20px',
        animationDuration: '10s',
        animationDelay: '2s'
      }}></div>

      <div className="page2-inner">
        <div className="p2-header">
          <span className="p2-eyebrow">Emma Rose Sullivan · Baby Shower</span>
          <h2 className="p2-title">Everything You Need to Know</h2>
          <div className="p2-divider">
            <span></span><i></i><span></span>
          </div>
        </div>

        <div className="info-section">
          <p className="section-tag">Your Response</p>
          <h3 className="section-title">Will you be joining us?</h3>

          {!submitted ? (
            <>
              <div className="rsvp-options">
                <button
                  className={`rsvp-option ${selectedOption === 'yes' ? 'selected' : ''}`}
                  onClick={() => handleSelectOption('yes')}
                >
                  <span className="option-radio"></span>
                  <span className="option-text">
                    <span className="option-main">Joyfully Accepts</span>
                    <span className="option-sub">Yes, I wouldn't miss it for the world</span>
                  </span>
                  <span className="option-emoji">🌿</span>
                </button>
                <button
                  className={`rsvp-option ${selectedOption === 'maybe' ? 'selected' : ''}`}
                  onClick={() => handleSelectOption('maybe')}
                >
                  <span className="option-radio"></span>
                  <span className="option-text">
                    <span className="option-main">Will Try to Make It</span>
                    <span className="option-sub">Still checking my schedule — will confirm soon</span>
                  </span>
                  <span className="option-emoji">🌸</span>
                </button>
                <button
                  className={`rsvp-option ${selectedOption === 'no' ? 'selected' : ''}`}
                  onClick={() => handleSelectOption('no')}
                >
                  <span className="option-radio"></span>
                  <span className="option-text">
                    <span className="option-main">Sends Love from Afar</span>
                    <span className="option-sub">Sadly unable to attend, but celebrating you</span>
                  </span>
                  <span className="option-emoji">💌</span>
                </button>
              </div>

              {(selectedOption === 'yes' || selectedOption === 'maybe') && (
                <div className="guest-input-row">
                  <span className="guest-label">Number of guests attending</span>
                  <div className="guest-counter">
                    <button className="counter-btn" onClick={() => handleChangeCount(-1)}>−</button>
                    <span className="counter-num">{guestCount}</span>
                    <button className="counter-btn" onClick={() => handleChangeCount(1)}>+</button>
                  </div>
                </div>
              )}

              {selectedOption && (
                <>
                  <div style={{ marginTop: '12px' }}>
                    <textarea
                      className="note-input"
                      placeholder="Leave a note for the mama-to-be…"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                  <button className="submit-btn" onClick={handleSubmit}>
                    Send My RSVP ✦
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="confirmation show">
              <div className="conf-icon">🌿</div>
              <p className="conf-title">Thank you so much!</p>
              <p className="conf-sub">Your response has been received with love.</p>
            </div>
          )}
        </div>

        <div className="info-section">
          <p className="section-tag">Event Details</p>

          <div className="info-row">
            <div className="info-icon">📅</div>
            <div className="info-content">
              <span className="info-label">Date</span>
              <span className="info-value">Saturday, June 14th, 2025</span>
              <span className="info-note">Doors open at 1:30 PM · Celebration begins at 2:00 PM</span>
            </div>
          </div>

          <div className="info-row">
            <div className="info-icon">🕑</div>
            <div className="info-content">
              <span className="info-label">Schedule</span>
              <div className="timeline" style={{ marginTop: '8px' }}>
                <div className="timeline-item">
                  <span className="timeline-time">1:30 PM</span>
                  <span className="timeline-event">Guests arrive & welcome drinks</span>
                </div>
                <div className="timeline-item">
                  <span className="timeline-time">2:00 PM</span>
                  <span className="timeline-event">Shower celebration begins</span>
                </div>
                <div className="timeline-item">
                  <span className="timeline-time">3:00 PM</span>
                  <span className="timeline-event">Garden brunch & games</span>
                </div>
                <div className="timeline-item">
                  <span className="timeline-time">4:00 PM</span>
                  <span className="timeline-event">Gift opening & cake</span>
                </div>
                <div className="timeline-item" style={{ paddingBottom: 0 }}>
                  <span className="timeline-time">5:00 PM</span>
                  <span className="timeline-event">Farewell & safe travels</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="info-section">
          <p className="section-tag">Location</p>

          <div className="info-row" style={{ marginBottom: '12px' }}>
            <div className="info-icon">📍</div>
            <div className="info-content">
              <span className="info-label">Venue</span>
              <span className="info-value">The Garden at Willow Creek Estate</span>
              <span className="info-note">123 Garden Lane, Austin, TX 78701</span>
              <button className={`copy-btn ${isCopied ? 'copied' : ''}`} onClick={handleCopyAddress}>
                <span>{copyText}</span>
              </button>
            </div>
          </div>

          <div className="info-row" style={{ marginBottom: '12px' }}>
            <div className="info-icon">🚗</div>
            <div className="info-content">
              <span className="info-label">Parking</span>
              <span className="info-value" style={{ fontSize: '14px' }}>Complimentary valet available</span>
              <span className="info-note">Self-parking also available on Garden Lane & side streets</span>
            </div>
          </div>

          <div className="map-frame">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.5!2d-97.7431!3d30.2672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b59b9ab79261%3A0x87cf2f28dc5b74a!2sAustin%2C%20TX!5e0!3m2!1sen!2sus!4v1699999999"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Venue location">
            </iframe>
            <button className="map-overlay-btn" onClick={handleOpenMaps}>Open in Maps ↗</button>
          </div>
        </div>

        <div className="info-section">
          <p className="section-tag">What to Expect</p>

          <div className="info-row">
            <div className="info-icon">👗</div>
            <div className="info-content">
              <span className="info-label">Dress Code</span>
              <span className="info-value">Garden Chic</span>
              <span className="info-note">Florals, soft linens & pastels encouraged · Heels not recommended (garden paths)</span>
              <div className="tag-row">
                <span className="tag">Sage & Earthy Tones</span>
                <span className="tag">Floral Prints</span>
                <span className="tag">Soft Linen</span>
              </div>
            </div>
          </div>

          <div className="info-row">
            <div className="info-icon">🍽️</div>
            <div className="info-content">
              <span className="info-label">Menu</span>
              <span className="info-value" style={{ fontSize: '14px' }}>Garden Brunch Spread</span>
              <span className="info-note">Seasonal florals, fresh pastries, fruit & mimosas · Please note dietary needs when RSVPing</span>
            </div>
          </div>

          <div className="info-row" style={{ marginBottom: 0 }}>
            <div className="info-icon">🎁</div>
            <div className="info-content">
              <span className="info-label">Registry</span>
              <span className="info-value" style={{ fontSize: '14px' }}>Your presence is the greatest gift</span>
              <span className="info-note">Registry available at Pottery Barn Kids & Amazon · Links sent via email</span>
              <div className="tag-row">
                <span className="tag">Pottery Barn Kids</span>
                <span className="tag">Amazon Registry</span>
              </div>
            </div>
          </div>
        </div>

        <div className="info-section" style={{ marginBottom: 0 }}>
          <p className="section-tag">Questions?</p>
          <div className="info-row" style={{ marginBottom: 0 }}>
            <div className="info-icon">💬</div>
            <div className="info-content">
              <span className="info-label">Hosted by</span>
              <span className="info-value" style={{ fontSize: '15px' }}>Sarah & Michelle Sullivan</span>
              <span className="info-note" style={{ marginTop: '4px' }}>hello@emmasshower.com · (555) 012-3456</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
