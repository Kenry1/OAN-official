import React, { useState, useEffect, useRef } from 'react';
import { FaLinkedin } from 'react-icons/fa';
import HideOnScrollHeader from '../components/HideOnScrollHeader.jsx';
import Footer from '../components/Footer';

// Warping dot component for right side
function WarpingDot({ sectionRef, mousePos }) {
  const dotRef = useRef(null);
  const [warp, setWarp] = useState({ x: 0, y: 0 });

  const getWarpOffset = (elementX, elementY) => {
    if (!sectionRef.current || (mousePos.x === 0 && mousePos.y === 0)) {
      return { x: 0, y: 0 };
    }
    const dx = mousePos.x - elementX;
    const dy = mousePos.y - elementY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance === 0) return { x: 0, y: 0 };
    const maxDistance = 400;
    const strength = Math.min(1 - (distance / maxDistance), 0.8);
    return {
      x: (dx / distance) * strength * 15,
      y: (dy / distance) * strength * 15,
    };
  };

  useEffect(() => {
    const updateWarp = () => {
      if (dotRef.current && sectionRef.current) {
        const rect = dotRef.current.getBoundingClientRect();
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const elementX = rect.left - sectionRect.left + rect.width / 2;
        const elementY = rect.top - sectionRect.top + rect.height / 2;
        const offset = getWarpOffset(elementX, elementY);
        setWarp(offset);
      }
    };
    updateWarp();
    const interval = setInterval(updateWarp, 50);
    return () => clearInterval(interval);
  }, [mousePos, sectionRef]);

  return (
    <div 
      ref={dotRef}
      className="w-4 h-4 rounded-full bg-white shadow-lg group hover:scale-150 transition-all duration-300"
      style={{
        transform: `translate(${warp.x}px, ${warp.y}px)`,
        transition: 'transform 0.15s ease-out',
      }}
    />
  );
}

// Left side dot component with warping
function LeftDot({ index, sectionRef, mousePos }) {
  const dotRef = useRef(null);
  const [warp, setWarp] = useState({ x: 0, y: 0 });

  const getWarpOffset = (elementX, elementY) => {
    if (!sectionRef.current || (mousePos.x === 0 && mousePos.y === 0)) {
      return { x: 0, y: 0 };
    }
    const dx = mousePos.x - elementX;
    const dy = mousePos.y - elementY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance === 0) return { x: 0, y: 0 };
    const maxDistance = 400;
    const strength = Math.min(1 - (distance / maxDistance), 0.8);
    return {
      x: (dx / distance) * strength * 15,
      y: (dy / distance) * strength * 15,
    };
  };

  useEffect(() => {
    const updateWarp = () => {
      if (dotRef.current && sectionRef.current) {
        const rect = dotRef.current.getBoundingClientRect();
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const elementX = rect.left - sectionRect.left + rect.width / 2;
        const elementY = rect.top - sectionRect.top + rect.height / 2;
        const offset = getWarpOffset(elementX, elementY);
        setWarp(offset);
      }
    };
    updateWarp();
    const interval = setInterval(updateWarp, 50);
    return () => clearInterval(interval);
  }, [mousePos, sectionRef]);

  return (
    <div
      ref={dotRef}
      className="relative group"
      style={{
        transform: `translate(${warp.x}px, ${warp.y}px)`,
        transition: 'transform 0.15s ease-out',
      }}
    >
      <div 
        className="w-3 h-3 rounded-full bg-white/80 group-hover:bg-white group-hover:scale-150 transition-all duration-300 shadow-lg"
        style={{
          animation: `pulse 2s ease-in-out infinite`,
          animationDelay: `${index * 0.3}s`,
        }}
      />
      <div 
        className="absolute inset-0 w-3 h-3 rounded-full bg-white/40 group-hover:bg-white/60"
        style={{
          animation: `ping 2s ease-in-out infinite`,
          animationDelay: `${index * 0.3}s`,
        }}
      />
    </div>
  );
}

// Profile Hero Section with decorative elements
function ProfileHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll);
      return () => {
        section.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const parallaxOffset = scrollY * 0.1;

  return (
    <section 
      ref={sectionRef}
      className="relative text-white py-16 pt-32 overflow-hidden min-h-[35vh] md:min-h-[70vh] flex items-end"
      style={{
        backgroundImage: "url('/c-profile2.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/35" />
      
      {/* Left side: Horizontal line with three dots (loading effect) */}
      <div 
        className="absolute left-6 bottom-10 hidden sm:flex flex-col items-start gap-3"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
        }}
      >
        {/* Horizontal line */}
        <div className="w-px h-24 bg-white/30 origin-bottom rotate-90 translate-x-12" />
        
        {/* Three dots with loading effect */}
        {[0, 1, 2].map((i) => (
          <LeftDot key={i} index={i} sectionRef={sectionRef} mousePos={mousePos} />
        ))}
      </div>

      {/* Right side: Two vertical lines with white dot in between */}
      <div 
        className="absolute right-6 bottom-10 hidden sm:flex flex-col items-center gap-6"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
        }}
      >
        {/* Top line */}
        <div className="w-px h-16 bg-white/30 origin-top" />
        
        {/* White circle dot */}
        <WarpingDot sectionRef={sectionRef} mousePos={mousePos} />
        
        {/* Bottom line (doesn't join) */}
        <div className="w-px h-16 bg-white/30 origin-top" />
      </div>
      
      <div className="relative container mx-auto px-4 pb-8 w-full flex justify-end">
        <div className="text-right max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">Profile</h1>
          <p className="mt-4 text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            Overview of Access Africa Networks: divisions, management, and our sector verticals.
          </p>
        </div>
      </div>

      {/* Add CSS animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
      </section>
  );
}

export default function Profile() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header (auto-hide on scroll) */}
      <HideOnScrollHeader />
      
      <ProfileHero />

      {/* Content */}
      <section className="container mx-auto px-4 py-12 space-y-12">
        {/* Divisions */}
        <div id="divisions">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-gray-100 p-6 shadow-sm bg-white">
              <h3 className="font-semibold text-lg mb-2">Corporate & Liaison</h3>
              <p className="text-gray-600">Regulatory engagement, policy navigation, and stakeholder relations across markets.</p>
            </div>
            <div className="rounded-xl border border-gray-100 p-6 shadow-sm bg-white">
              <h3 className="font-semibold text-lg mb-2">Program Delivery</h3>
              <p className="text-gray-600">Project structuring, coordination, vendor management, and execution oversight.</p>
            </div>
          </div>
        </div>

        {/* Management */}
        <div id="management">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Management</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Member of the Board - Jan Sandén */}
            <div className="rounded-xl border border-gray-100 p-6 shadow-sm bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src="/president.jpeg" 
                  alt="Jan Sandén" 
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-black">Jan Sandén</h3>
                  <p className="text-gray-500 text-sm mb-1">Member of the Board</p>
                  <p className="text-gray-400 text-xs italic">Ex-Ericsson</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Jan has over 40 years' experience in the telecommunication sector in Europe, Middle East and Africa in different organization leadership roles from network roll out, services delivery, solution architecture to operations of networks. He is a successful business owner and leader in the East Africa market.
              </p>
              <a 
                href="https://www.linkedin.com/in/jan-sand%C3%A9n-2b7196/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <FaLinkedin className="text-lg" />
                <span className="text-sm">LinkedIn</span>
              </a>
              </div>

            {/* VP-Technical Sales - Geoffrey Kirumba */}
            <div className="rounded-xl border border-gray-100 p-6 shadow-sm bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src="/sales.jpeg" 
                  alt="Geoffrey Kirumba" 
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-black">Geoffrey Kirumba</h3>
                  <p className="text-gray-500 text-sm mb-1">VP-Technical Sales</p>
                  <p className="text-gray-400 text-xs italic">21 years' Experience, Ex-Ericsson Sub Saharan Africa; Safaricom</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Telecoms Projects Delivery Professional experienced in site build implementation services.
                <br /><br />
                Accountable for planning and managing the rollout of deployment activities for whole or part of a customer project, ensuring the project is delivered in scope of contractual obligations and within forecasted costs, time, and quality.
                <br /><br />
                Fttx Specialist and Planner. Jeosatt Solutions Founder
              </p>
              <a 
                href="https://www.linkedin.com/in/geoffrey-kirumba-6a58248a" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <FaLinkedin className="text-lg" />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divisions */}
        <div id="sectors" className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold">Divisions</h2>
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
            {/* VP-Business Development - Cosmas Mutuku */}
            <div className="rounded-xl border border-gray-100 p-6 shadow-sm bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src="/VP-BD.jpeg" 
                  alt="Cosmas Mutuku" 
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-black">Cosmas Mutuku</h3>
                  <p className="text-gray-500 text-sm mb-1">VP-Business Development</p>
                  <p className="text-gray-400 text-xs italic">25 years' Experience, Ex-Ericsson Sub Saharan Africa</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Electrical & Electronics Engineering professional practicing in Information & Communications Technology and Energy Industries. Experienced in Business development, Bid Management, Sales, Solution Management, Contract Fulfillment and Post sales areas.
                <br /><br />
                Energy and Telecom Professional. Network Management and Operations.
              </p>
              <a 
                href="https://www.linkedin.com/in/cosmas-mutuku-a5263169/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <FaLinkedin className="text-lg" />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>

            {/* CFO - Augustine Hiuhu */}
            <div className="rounded-xl border border-gray-100 p-6 shadow-sm bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src="/cfo.jpeg" 
                  alt="Augustine Hiuhu" 
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-black">Augustine Hiuhu</h3>
                  <p className="text-gray-500 text-sm mb-1">Chief Financial Officer</p>
                  <p className="text-gray-400 text-xs italic">18yrs Experience, Ex-Ericsson Sub Saharan Africa & Middle East; BAT, Chase Group.</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                CPA(K) & Bcom (Finance & Accounting), extensive experience in financial planning, controlling, reporting, analysis, risk management and processes optimization. Other expertise also includes leading capital raising projects, treasury management and commercial contracts management.
              </p>
              <a 
                href="https://www.linkedin.com/in/augustine-hiuhu-9275355b" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <FaLinkedin className="text-lg" />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>

            {/* Lead Software Engineer - Kenneth Shepherd Murithi */}
            <div className="rounded-xl border border-gray-100 p-6 shadow-sm bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src="/ict.jpeg" 
                  alt="Kenneth Shepherd Murithi" 
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-black">Kenneth Shepherd Murithi</h3>
                  <p className="text-gray-500 text-sm mb-1">Lead Software Engineer</p>
                </div>
            </div>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                A software professional who thrives on building practical, reliable solutions that solve real problems. Focused on designing efficient workflows, improving system reliability, and collaborating closely with teams to deliver software that works smoothly in real-world environments. Known for a hands-on approach and commitment to quality, turning complex challenges into effective, maintainable solutions.
              </p>
              <a 
                href="https://www.linkedin.com/in/kenneth-shepherd-b960631b9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <FaLinkedin className="text-lg" />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}





