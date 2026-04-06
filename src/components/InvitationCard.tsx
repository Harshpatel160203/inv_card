import { BotanicalTop, BotanicalBottom, BotanicalSide, BotanicalSideRight } from './BotanicalSVG';

interface InvitationCardProps {
  onRSVPClick: () => void;
}

export default function InvitationCard({ onRSVPClick }: InvitationCardProps) {
  return (
    <section id="page1" className="page">
      <div className="card">
        <div className="card-border"></div>
        <div className="card-border-inner"></div>

        <BotanicalTop />
        <BotanicalBottom />
        <BotanicalSide />
        <BotanicalSideRight />

        <p className="eyebrow anim-0">Please Join Us to Celebrate</p>

        <h1 className="headline anim-1">A Little Wild One</h1>
        <h2 className="subheadline anim-2">is on the Way</h2>

        <div className="divider-row anim-3">
          <span className="divider-line line-anim line-anim-1"></span>
          <span className="divider-gem"></span>
          <span className="divider-line line-anim line-anim-2"></span>
        </div>

        <p className="celebrating-label anim-3">Celebrating & Honoring</p>

        <h3 className="honoree-name anim-4">Emma Rose Sullivan</h3>

        <div style={{height:'1px', background:'rgba(189,181,166,0.3)', margin: '4px 30px 16px'}} className="anim-4"></div>

        <div className="anim-5">
          <p className="detail-label">Date &amp; Time</p>
          <p className="detail-value">Saturday, the Fourteenth of June, 2025</p>
          <p className="detail-sub">Two O'Clock in the Afternoon</p>
        </div>

        <div className="anim-6">
          <p className="detail-label">Venue</p>
          <p className="detail-value">The Garden at Willow Creek Estate</p>
          <p className="detail-sub">123 Garden Lane · Austin, Texas 78701</p>
        </div>

        <div className="rsvp-nudge anim-7">
          <p>Kindly reply by June 1st, 2025</p>
          <button className="rsvp-btn" onClick={onRSVPClick}>
            <span>RSVP &amp; Details ↓</span>
          </button>
        </div>
      </div>

      <div className="scroll-indicator" onClick={onRSVPClick}>
        <span>Scroll for Details</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
}
