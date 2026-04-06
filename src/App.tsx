import ParticleCanvas from './components/ParticleCanvas';
import FloatingLeaves from './components/FloatingLeaves';
import InvitationCard from './components/InvitationCard';
import RSVPSection from './components/RSVPSection';
import './styles/invitation.css';

function App() {
  const scrollToPage2 = () => {
    const page2 = document.getElementById('page2');
    if (page2) {
      page2.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <ParticleCanvas />
      <FloatingLeaves />
      <InvitationCard onRSVPClick={scrollToPage2} />
      <RSVPSection />
    </>
  );
}

export default App;
