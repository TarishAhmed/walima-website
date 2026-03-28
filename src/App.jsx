import Hero from './components/Hero.jsx';
import Invitation from './components/Invitation.jsx';
import EventDetails from './components/EventDetails.jsx';
import Countdown from './components/Countdown.jsx';
import Gallery from './components/Gallery.jsx';
import VenueMap from './components/VenueMap.jsx';
import RSVPForm from './components/RSVPForm.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Hero />
      <Invitation />
      <EventDetails />
      <Countdown />
      {/* <Gallery /> */}
      <VenueMap />
      <RSVPForm />
      <Footer />
    </div>
  );
}
