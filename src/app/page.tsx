
import Navbar from '@/lib/components/Navbar';
import ProgressBar from '@/lib/components/ProgressBar';
import CallToActionSection from './components/CallToActionSection';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import LatestInternshipSection from './components/LatestInternshipSection';
import TestimonialSection from './components/TestimonialSection';


export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <TestimonialSection />
      <LatestInternshipSection />
      <CallToActionSection />
    </main>
  );
}