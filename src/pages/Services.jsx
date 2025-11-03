import React, { useState, useEffect, useRef } from 'react';
import { FaGlobe, FaShieldAlt, FaChartLine, FaServer, FaNetworkWired, FaWifi, FaCloud, FaArrowRight } from 'react-icons/fa';
import HideOnScrollHeader from '../components/HideOnScrollHeader.jsx';
import Footer from '../components/Footer';

// Service Card Component with animations
function ServiceCard({ service, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, index * 150);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-1000 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="relative group/card p-[1px] rounded-2xl bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 hover:from-blue-500/40 hover:to-purple-500/40 transition">
      <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 [transform:perspective(1200px)] group-hover:[transform:perspective(1200px)_rotateX(1.2deg)_rotateY(-1.2deg)]">
        {/* Image Container with rounded edges */}
        <div className="relative h-72 md:h-96 overflow-hidden rounded-t-2xl bg-gray-100">
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Icon Badge */}
          <div className="absolute top-6 right-6 transform group-hover:scale-110 transition-transform duration-500">
            <div className="bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-xl">
              <div className="text-blue-600 text-3xl">
                {service.icon}
              </div>
            </div>
          </div>

          {/* Floating Stats Infographic */}
          <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">{service.stat}</div>
                  <div className="text-sm text-gray-600">{service.statLabel}</div>
                </div>
                <div className="h-12 w-px bg-gray-300" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">{service.stat2}</div>
                  <div className="text-sm text-gray-600">{service.statLabel2}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-5">
          <div className="flex items-start justify-between">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
              {service.title}
            </h2>
          </div>
          
          <p className="text-gray-600 text-lg font-medium leading-relaxed">
            {service.description}
          </p>
          
          <p className="text-gray-500 leading-relaxed">
            {service.content}
          </p>

          {/* Feature Icons */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            {service.features.map((feature, idx) => (
              <div
                key={idx}
                style={{ transitionDelay: `${idx * 50}ms` }}
                className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-all duration-300 opacity-80 group-hover:opacity-100 translate-y-[2px] group-hover:translate-y-0"
              >
                <div className="text-blue-600">{feature.icon}</div>
                <span className="text-sm font-medium text-gray-700">{feature.label}</span>
              </div>
            ))}
          </div>

          {/* Learn More Link */}
          <div className="pt-2">
            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 group/link transition-colors"
            >
              Learn More
              <FaArrowRight className="transform group-hover/link:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
      {/* Glow */}
      <div className="pointer-events-none absolute -inset-1 rounded-[1.1rem] blur-2xl opacity-0 group-hover/card:opacity-30 transition bg-gradient-to-tr from-blue-500/30 to-purple-500/30"></div>
      </div>
    </div>
  );
}

// Generic reveal-on-scroll wrapper
function Reveal({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [delay]);
  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {children}
    </div>
  );
}

function StatCard({ icon, title, text, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition shadow-sm hover:shadow-md transform hover:-translate-y-1">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mb-4">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{text}</p>
      </div>
    </Reveal>
  );
}

export default function Services() {
  const services = [
    {
      title: 'Wholesale Solutions & Products',
      image: '/wholesale.jpeg',
      icon: <FaNetworkWired />,
      description: 'Access Africa Networks delivers connectivity everywhere in the last mile.',
      content: 'We offer operators, carriers and service providers a wide and innovative range of wholesale products and services, ranging from Managed Services, Infrastructure Access, Direct Internet Access and Voice among others.',
      stat: '500+',
      statLabel: 'Service Providers',
      stat2: '99%',
      statLabel2: 'Uptime',
      features: [
        { icon: <FaServer className="text-sm" />, label: 'Managed Services' },
        { icon: <FaNetworkWired className="text-sm" />, label: 'Infrastructure' },
        { icon: <FaChartLine className="text-sm" />, label: 'Voice Solutions' },
      ]
    },
    {
      title: 'Connectivity',
      image: '/energy service.jpg',
      icon: <FaWifi />,
      description: 'Scalable connectivity and end-to-end transport from anywhere where our network exists.',
      content: 'Access Africa Networks range of Managed Connectivity solutions are designed to give operators, carriers and service providers scalable connectivity and end-to-end transport from anywhere where our network exists.',
      stat: '50+',
      statLabel: 'Countries',
      stat2: '24/7',
      statLabel2: 'Support',
      features: [
        { icon: <FaWifi className="text-sm" />, label: 'Scalable' },
        { icon: <FaGlobe className="text-sm" />, label: 'End-to-End' },
        { icon: <FaChartLine className="text-sm" />, label: 'Managed' },
      ]
    },
    {
      title: 'Infrastructure Access',
      image: '/data center.jpg',
      icon: <FaServer />,
      description: 'Physical infrastructure access on an open-access basis.',
      content: 'We recognize that physical infrastructure access is central to some operators, carriers and service providers strategies and we make a range of infrastructure available on an open-access basis.',
      stat: '1000+',
      statLabel: 'Locations',
      stat2: 'Open',
      statLabel2: 'Access',
      features: [
        { icon: <FaServer className="text-sm" />, label: 'Physical Infrastructure' },
        { icon: <FaNetworkWired className="text-sm" />, label: 'Open Access' },
        { icon: <FaShieldAlt className="text-sm" />, label: 'Secure' },
      ]
    },
    {
      title: 'Next Generation IP Services',
      image: '/ip service.jpg',
      icon: <FaCloud />,
      description: 'Fully managed, end-to-end IP services including white label solutions.',
      content: 'Access Africa Networks offer fully managed, end-to-end IP services - including white label broadband and voice solutions.',
      stat: '99.9%',
      statLabel: 'Reliability',
      stat2: '1TB+',
      statLabel2: 'Bandwidth',
      features: [
        { icon: <FaCloud className="text-sm" />, label: 'Fully Managed' },
        { icon: <FaNetworkWired className="text-sm" />, label: 'IP Services' },
        { icon: <FaChartLine className="text-sm" />, label: 'White Label' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <HideOnScrollHeader />

      {/* Hero Section */}
      <section 
        className="relative text-white py-24 pt-32 overflow-hidden"
        style={{
          backgroundImage: "url('/services.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">Our Services</h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed drop-shadow-md">
              Comprehensive connectivity solutions designed to power your business across Africa
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="relative max-w-7xl mx-auto">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -top-16 -left-20 h-72 w-72 bg-blue-200/40 rounded-full blur-3xl"></div>
            <div className="pointer-events-none absolute -bottom-20 -right-24 h-80 w-80 bg-purple-200/40 rounded-full blur-3xl"></div>
            <div className="relative grid md:grid-cols-2 gap-10">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics/Infographics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Why Choose Access Africa Networks</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <StatCard icon={<FaGlobe className="text-2xl" />} title="Pan-African" text="Network coverage across multiple African countries" delay={0} />
            <StatCard icon={<FaShieldAlt className="text-2xl" />} title="Reliable" text="99.9% uptime guarantee with robust infrastructure" delay={100} />
            <StatCard icon={<FaChartLine className="text-2xl" />} title="Scalable" text="Solutions that grow with your business needs" delay={200} />
            <StatCard icon={<FaServer className="text-2xl" />} title="Managed" text="Fully managed services with 24/7 support" delay={300} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

