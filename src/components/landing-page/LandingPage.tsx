import Hero from './Hero';
import TrustBar from './TrustBar';
import HowItWorks from './HowItWorks';
import InsightCards from './InsightCards';
import Testimonial from './Testimonial';
import DashboardPreview from './DashboardPreview';
import ExpertSeal from './ExpertSeal';
import CallToAction from './CallToAction';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <TrustBar />
      <HowItWorks />
      <InsightCards />
      <Testimonial />
      <DashboardPreview />
      <ExpertSeal />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage; 