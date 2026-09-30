import Hero from '../sections/Hero.jsx';
import Features from '../sections/Features.jsx';
import Metrics from '../sections/Metrics.jsx';
import Testimonials from '../sections/Testimonials.jsx';
import CallToAction from '../sections/CallToAction.jsx';

// Owner: Lead (Claude). Only arranges sections; the sections themselves are owned per TASKS.md.
export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Metrics />
      <Testimonials />
      <CallToAction />
    </>
  );
}
