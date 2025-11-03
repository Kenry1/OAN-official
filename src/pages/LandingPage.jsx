import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaGlobeAfrica, FaHandsHelping, FaIndustry, FaBalanceScale, FaBolt, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowRight, FaCheckCircle, FaBars, FaFacebookF, FaTwitter, FaInstagram, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import HideOnScrollHeader from '../components/HideOnScrollHeader.jsx';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Header (auto-hide on scroll) */}
      <HideOnScrollHeader />

      {/* Hero Section mimicking the provided design */}
      <section
        className="relative text-white overflow-hidden min-h-[90vh]"
        style={{
          backgroundImage: "url('/landing%20page%20image.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Left vertical rail */}
        <div className="absolute inset-y-0 left-6 hidden sm:flex flex-col items-center">
          <div className="h-full w-px bg-white/30" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 origin-left text-white/80 flex items-center gap-2">
            <img src="/ANA%20logo.jpg" alt="AAN logo" className="h-10 md:h-12 w-auto rounded-xl ring-2 ring-blue-500/60 drop-shadow-[12px_0_0_rgba(37,99,235,0.55)]" />
          </div>
          <div className="absolute bottom-10 flex flex-col gap-4 text-white/70">
            <a href="#" className="text-white hover:text-white transition-colors"><FaFacebookF /></a>
            <a href="#" className="text-white hover:text-white transition-colors"><FaTwitter /></a>
            <a href="#" className="text-white hover:text-white transition-colors"><FaInstagram /></a>
          </div>
        </div>

        {/* Massive heading */}
        <div className="relative container mx-auto px-6 pt-28 pb-16">
          <h1 className="font-extrabold leading-none drop-shadow-[0_6px_10px_rgba(0,0,0,0.4)] text-[16vw] md:text-[12vw] select-none">
            ACCESS AFRICA NETWORKS
          </h1>

          {/* Bottom-left descriptive text */}
          <div className="max-w-2xl text-white/90 text-sm md:text-base mt-10 md:mt-16">
            <p>
              Access Africa Networks Limited (AAN) is an African, Kenya headquarters-based technology and
              investment facilitation company specializing in local liaison, regulatory navigation, and
              market-entry support for international investors seeking to establish and expand their presence
              across Africa.
            </p>
          </div>
        </div>

        {/* Removed floating basket button per request */}
      </section>
{/* About Section */}
<section className="w-full bg-white">

 
  <div className="px-4 py-16 max-w-5xl mx-auto text-center">

    <h2 className="text-4xl font-bold mb-6 tracking-tight text-teal-600">
      About Access Africa Networks
    </h2>

    <p className="text-gray-700 leading-relaxed mb-6">
      Access Africa Networks Limited (AAN) is a Kenya-based technology and 
      investment facilitation firm bridging global investors with East Africa’s 
      high-growth markets. We specialize in regulatory navigation, local liaison, 
      and market-entry strategy for international companies expanding into the region.
    </p>

    <p className="text-gray-700 leading-relaxed">
      With extensive experience in engineering, infrastructure deployment, and 
      business facilitation, we support the full investment lifecycle — pre-investment 
      discovery, investment structuring, and long-term post-investment operational execution.
    </p>

    {/* Animated Badges */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">

      {[
        { label: 'Regulatory', icon: <FaCheckCircle /> },
        { label: 'Energy', icon: <FaBolt /> },
        { label: 'Telecom', icon: <FaGlobeAfrica /> },
        { label: 'Industrial', icon: <FaIndustry /> },
      ].map((item, idx) => (
        <div
          key={idx}
          className="
            flex flex-col items-center justify-center gap-2 
            border rounded-xl py-4 bg-white shadow-sm 
            hover:shadow-lg hover:scale-[1.05] 
            transition-all duration-300
            animate-[float_4s_ease-in-out_infinite]
          "
          style={{ animationDelay: `${idx * 0.3}s` }}
        >
          <div className="text-green-500 text-xl animate-pulse">
            {item.icon}
          </div>
          <span className="text-sm text-gray-700">{item.label}</span>
        </div>
      ))}

    </div>
      {/* Full-bleed image area */}
   <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-64 md:h-80 bg-gray-200 overflow-hidden">
     <img src="/data%20center.jpg" alt="Data center" className="w-full h-full object-cover" />
   </div>

  </div>

</section>



      {/* Services Section */}
      <section id="services" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-teal-600">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <FaHandsHelping />
                </div>
                <h3 className="text-xl font-semibold text-teal-700">Pre-Investment Phase</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Market Intelligence & Studies</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Regulatory Navigation</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Stakeholder Engagement</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Investment Promotion</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <FaBalanceScale />
                </div>
                <h3 className="text-xl font-semibold text-teal-700">Investment Phase</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Permits & Licensing</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Land & Power Access</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Project Coordination</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Legal & Tax Support</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <FaIndustry />
                </div>
                <h3 className="text-xl font-semibold text-teal-700">Post-Investment</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Community Management</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Investor Relations</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Policy Tracking</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Problem Resolution</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Sectors - Slideshow */}
      <SectorsSlideshow />

      {/* Contact Section - edge to edge with map */}
  <section id="contact" className="pt-0 pb-0 bg-white">
        {/* Contact info cards */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-10 text-teal-600">Contact Us</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="h-12 w-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4 animate-float">
                <FaMapMarkerAlt />
              </div>
              <div className="text-gray-700">Watermark Business Park, Ndege Road, Karen – Nairobi, Kenya</div>
            </div>
            <a href="tel:+254727564269" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="h-12 w-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4 animate-float">
                <FaPhoneAlt />
              </div>
              <div className="text-gray-700 group-hover:text-gray-900 transition-colors">+254 727 564 269</div>
            </a>
            <a href="mailto:info@accessafricanetworks.com" className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="h-12 w-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4 animate-float">
                <FaEnvelope />
              </div>
              <div className="text-gray-700 group-hover:text-gray-900 transition-colors">info@accessafricanetworks.com</div>
            </a>
          </div>
        </div>

        {/* Full-bleed map */}
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-[340px] md:h-[420px]">
          <iframe
            title="AAN Location"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.635383101955!2d36.7056!3d-1.3505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f05d9a4c1d9af%3A0x7d8a4f3b0a4b1c87!2sKaren%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1700000000000"
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;

// Slide Content Component (for crossfade)
function SlideContent({ sector, index, counters }) {
  return (
    <>
      <img
        src={sector.img}
        alt={sector.label}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-white">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 backdrop-blur rounded-xl p-4">
              {sector.icon}
            </div>
            <h3 className="text-4xl md:text-5xl font-extrabold">{sector.label}</h3>
          </div>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-6">
            {sector.description}
          </p>
        </div>

        {/* Analytics Counters */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
            <div className="text-3xl md:text-4xl font-bold mb-1">
              {counters[`${index}-projects`] ?? 0}+
            </div>
            <div className="text-sm text-gray-300">Projects</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
            <div className="text-3xl md:text-4xl font-bold mb-1">
              {counters[`${index}-capacity`] !== undefined 
                ? `${counters[`${index}-capacity`]}${sector.stats.capacityUnit}`
                : `0${sector.stats.capacityUnit}`
              }
            </div>
            <div className="text-sm text-gray-300">Capacity</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
            <div className="text-3xl md:text-4xl font-bold mb-1">
              {counters[`${index}-countries`] ?? 0}+
            </div>
            <div className="text-sm text-gray-300">Countries</div>
          </div>
        </div>

        {/* Learn More Button */}
        <button className="group inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 w-fit">
          Learn More
          <FaArrowRight className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </>
  );
}

// Sectors Slideshow Component
function SectorsSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fadeState, setFadeState] = useState('idle'); // 'idle', 'fading-out', 'fading-in'
  const [counters, setCounters] = useState({});
  const sectionRef = useRef(null);

  const sectors = [
    {
      label: 'Data Centers',
      icon: <FaBolt className="text-4xl" />,
      img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1974&auto=format&fit=crop',
      description: 'Infrastructure for cloud computing, colocation, and digital transformation across Africa.',
      stats: { projects: 45, capacity: 2.5, capacityUnit: 'MW', countries: 8 }
    },
    {
      label: 'Energy',
      icon: <FaBolt className="text-4xl" />,
      img: '/energy.jpg',
      description: 'Renewable energy projects, grid access, and power infrastructure development.',
      stats: { projects: 32, capacity: 850, capacityUnit: 'MW', countries: 12 }
    },
    {
      label: 'Telecom',
      icon: <FaGlobeAfrica className="text-4xl" />,
      img: '/telecom.jpg',
      description: 'Fiber networks, tower infrastructure, and connectivity solutions across East Africa.',
      stats: { projects: 67, capacity: 5.2, capacityUnit: 'K km', countries: 15 }
    },
    {
      label: 'Industrial',
      icon: <FaIndustry className="text-4xl" />,
      img: 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?q=80&w=1974&auto=format&fit=crop',
      description: 'Industrial parks, manufacturing facilities, and logistics infrastructure.',
      stats: { projects: 28, capacity: 420, capacityUnit: 'ha', countries: 6 }
    },
  ];

  // Animate counter when slide changes or section is visible
  useEffect(() => {
    const currentSector = sectors[currentIndex];
    const statKeys = ['projects', 'capacity', 'countries'];
    
    statKeys.forEach((key) => {
      const value = currentSector.stats[key];
      if (typeof value === 'number') {
        animateCounter(`${currentIndex}-${key}`, 0, value, 1500);
      }
    });
  }, [currentIndex]);

  // Initial animation when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const currentSector = sectors[currentIndex];
          const statKeys = ['projects', 'capacity', 'countries'];
          
          statKeys.forEach((key) => {
            const value = currentSector.stats[key];
            if (typeof value === 'number') {
              animateCounter(`${currentIndex}-${key}`, 0, value, 1500);
            }
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [currentIndex]);

  const animateCounter = (id, start, end, duration) => {
    let startTime = null;
    const updateCounter = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = start + (end - start) * progress;
      // Round to 1 decimal for capacity, floor for others
      const displayValue = id.includes('capacity') 
        ? Math.round(current * 10) / 10 
        : Math.floor(current);
      setCounters((prev) => ({ ...prev, [id]: displayValue }));
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    requestAnimationFrame(updateCounter);
  };

  const changeSlide = (newIndex) => {
    if (isTransitioning || newIndex === currentIndex) return;
    setPrevIndex(currentIndex);
    setIsTransitioning(true);
    setFadeState('fading-out');
    
    // Trigger the fade transition
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFadeState('fading-in');
      // After 1 second, complete transition
      setTimeout(() => {
        setIsTransitioning(false);
        setFadeState('idle');
      }, 1000);
    }, 10);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % sectors.length;
    changeSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + sectors.length) % sectors.length;
    changeSlide(newIndex);
  };

  // Autoplay every 3 seconds
  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      if (!isTransitioning) {
        const newIndex = (currentIndex + 1) % sectors.length;
        changeSlide(newIndex);
      }
    }, 3000);

    return () => clearInterval(autoplayInterval);
  }, [currentIndex, isTransitioning]);

  const currentSector = sectors[currentIndex];

  return (
    <section id="sectors" ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-600">Key Sectors</h2>
        
        {/* Slideshow Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Slide */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative h-[500px] md:h-[600px]">
              {/* Previous slide (fading out) */}
              {isTransitioning && (
                <div 
                  key={`prev-${prevIndex}`} 
                  className="absolute inset-0" 
                  style={{ 
                    opacity: fadeState === 'fading-out' ? 0 : 1,
                    transition: 'opacity 1s ease-in-out' 
                  }}
                >
                  <SlideContent sector={sectors[prevIndex]} index={prevIndex} counters={counters} />
                </div>
              )}
              
              {/* Current slide (fading in) */}
              <div 
                key={`curr-${currentIndex}`} 
                className="absolute inset-0" 
                style={{ 
                  opacity: fadeState === 'fading-in' ? 1 : (isTransitioning ? 0 : 1), 
                  transition: 'opacity 1s ease-in-out'
                }}
              >
                <SlideContent sector={currentSector} index={currentIndex} counters={counters} />
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur rounded-full p-3 text-white hover:bg-white/30 transition-all"
              aria-label="Previous slide"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur rounded-full p-3 text-white hover:bg-white/30 transition-all"
              aria-label="Next slide"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {sectors.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300 w-2'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
