import React, { useState } from 'react';
import { FaBriefcase, FaHandshake, FaNewspaper, FaLinkedin, FaTelegram, FaWhatsapp, FaTwitter } from 'react-icons/fa';
import HideOnScrollHeader from '../components/HideOnScrollHeader.jsx';
import Footer from '../components/Footer';

export default function ContactUs() {
  const [career, setCareer] = useState({ name: '', email: '', resume: null });
  const [partner, setPartner] = useState({ org: '', contact: '', details: '' });
  const [newsletter, setNewsletter] = useState({ email: '' });
  const [careerMsg, setCareerMsg] = useState('');
  const [partnerMsg, setPartnerMsg] = useState('');
  const [newsletterMsg, setNewsletterMsg] = useState('');

  const onCareerSubmit = (e) => {
    e.preventDefault();
    setCareerMsg('Thanks — your career application has been received (demo).');
    setTimeout(() => setCareerMsg(''), 5000);
  };

  const onPartnerSubmit = (e) => {
    e.preventDefault();
    setPartnerMsg('Thanks — we received your proposal (demo).');
    setTimeout(() => setPartnerMsg(''), 5000);
  };

  const onNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterMsg('Subscribed — check your email for confirmation (demo).');
    setTimeout(() => setNewsletterMsg(''), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <HideOnScrollHeader />

      <header className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="/landing page image.jpg"
          alt="Contact hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-end pb-8 text-white">
          <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow">Contact Us</h1>
          <p className="text-white/80 mt-2">Careers • Partnerships • Newsletter</p>
          <nav className="mt-4 flex gap-3 flex-wrap">
            <a href="#careers" className="text-sm px-4 py-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 transition">Careers</a>
            <a href="#partner" className="text-sm px-4 py-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 transition">Partnerships</a>
            <a href="#newsletter" className="text-sm px-4 py-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 transition">Newsletter</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
        <section id="careers" className="mb-0">
          <div className="rounded-xl shadow-sm bg-cover bg-center" style={{ backgroundImage: "url('/career2.png')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="bg-black/60 p-6 rounded-xl text-white">
              <div className="flex items-start gap-4">
              <div className="text-blue-600 text-3xl p-3 bg-blue-50 rounded-lg"><FaBriefcase /></div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold">Career Openings & Application</h2>
                <p className="text-white/80 mt-2">We're always looking for talented people. Submit your CV below.</p>

                {/* Job postings / post-cards container */}
                <div className="mt-4 grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                  <article className="bg-gray-50/80 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">Logistics Manager</h3>
                        <div className="text-sm text-gray-500">Nairobi · Full-time</div>
                      </div>
                      <div className="text-xs text-gray-400 bg-white border rounded px-2 py-1">#LM-001</div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">Operations</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">Supply Chain</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-50 text-amber-700">5+ yrs</span>
                    </div>
                    <p className="mt-3 text-gray-600 text-sm">Lead day-to-day logistics, vendor coordination, and last‑mile delivery optimization across East Africa. Proven experience in supply chain operations required.</p>
                    <div className="mt-4 flex items-center gap-3">
                      <button type="button" className="px-3 py-1 bg-blue-600 text-white rounded text-sm" onClick={() => {
                        setCareerMsg('Applying for Logistics Manager — please complete the form below.');
                        window.location.hash = '#careers';
                        document.getElementById('career-name-input')?.focus();
                      }}>Apply</button>
                      <a className="text-sm text-indigo-600 hover:underline" href="#">See details</a>
                    </div>
                  </article>
                </div>

                <form onSubmit={onCareerSubmit} className="mt-4 grid md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm text-white">Full name <span aria-hidden="true" className="text-red-500">*</span></span>
                    <input
                      id="career-name-input"
                      required
                      className="mt-1 block w-full p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Jane Doe"
                      value={career.name}
                      onChange={e => setCareer({ ...career, name: e.target.value })}
                      aria-describedby="career-name-help"
                    />
                    <small id="career-name-help" className="text-xs text-white/80">Use your full legal name.</small>
                  </label>
                  <label className="block">
                    <span className="text-sm text-white">Email <span aria-hidden="true" className="text-red-500">*</span></span>
                    <input
                      required
                      type="email"
                      className="mt-1 block w-full p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="name@example.com"
                      value={career.email}
                      onChange={e => setCareer({ ...career, email: e.target.value })}
                      aria-describedby="career-email-help"
                    />
                    <small id="career-email-help" className="text-xs text-white/80">We'll contact you at this address.</small>
                  </label>

                  <label className="block md:col-span-2">
                    <span className="text-sm text-white">Upload resume</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      onChange={e => setCareer({ ...career, resume: e.target.files[0] })}
                    />
                    {career.resume && <div className="mt-2 text-sm text-white/80">Selected: {career.resume.name}</div>}
                    <small className="text-xs text-white/80">Accepted formats: PDF, DOC, DOCX.</small>
                  </label>

                  <div className="md:col-span-2 flex items-center gap-3">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Apply</button>
                    <div className="text-sm text-green-600">{careerMsg}</div>
                  </div>
                </form>
              </div>
              </div>
            </div>
          </div>
        </section>

        <section id="partner" className="mb-0">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start gap-4">
              <div className="text-green-600 text-3xl p-3 bg-green-50 rounded-lg"><FaHandshake /></div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold">Partner / Proposals</h2>
                <p className="text-gray-600 mt-2">Share partnership proposals or RFP responses — we review all submissions.</p>

                <form onSubmit={onPartnerSubmit} className="mt-4 grid gap-4">
                  <label>
                    <span className="text-sm text-gray-700">Organization</span>
                    <input required className="mt-1 block w-full p-3 border rounded bg-gray-100" placeholder="Organization name" value={partner.org} onChange={e => setPartner({ ...partner, org: e.target.value })} />
                  </label>
                  <label>
                    <span className="text-sm text-gray-700">Contact (email/phone)</span>
                    <input required className="mt-1 block w-full p-3 border rounded bg-gray-100" placeholder="contact@example.com" value={partner.contact} onChange={e => setPartner({ ...partner, contact: e.target.value })} />
                  </label>
                  <label>
                    <span className="text-sm text-gray-700">Brief details</span>
                    <textarea required className="mt-1 block w-full p-3 border rounded bg-gray-100" rows={4} placeholder="Describe your proposal" value={partner.details} onChange={e => setPartner({ ...partner, details: e.target.value })} />
                  </label>

                  <div className="flex items-center gap-3">
                    <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Submit Proposal</button>
                    <div className="text-sm text-green-600">{partnerMsg}</div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section id="newsletter" className="mb-0">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start gap-4">
              <div className="text-indigo-600 text-3xl p-3 bg-indigo-50 rounded-lg"><FaNewspaper /></div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold">Newsletter / Subscription</h2>
                <p className="text-gray-600 mt-2">Subscribe for updates and market insights from AAN.</p>

                <form onSubmit={onNewsletterSubmit} className="mt-4 sm:flex sm:items-center gap-4">
                  <label className="flex-1">
                    <span className="sr-only">Email</span>
                    <input required type="email" className="mt-1 block w-full p-3 border rounded bg-gray-100" placeholder="you@example.com" value={newsletter.email} onChange={e => setNewsletter({ email: e.target.value })} />
                  </label>
                  <button type="submit" className="mt-3 sm:mt-0 px-4 py-2 bg-indigo-600 text-white rounded">Subscribe</button>
                </form>

                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Follow us</h3>
                  <div className="flex items-center gap-3">
                    <a href="#" aria-label="LinkedIn" className="inline-flex items-center gap-2 px-3 py-2 bg-white border rounded text-indigo-600"><FaLinkedin /> LinkedIn</a>
                    <a href="#" aria-label="Telegram" className="inline-flex items-center gap-2 px-3 py-2 bg-white border rounded text-indigo-600"><FaTelegram /> Telegram</a>
                    <a href="#" aria-label="WhatsApp" className="inline-flex items-center gap-2 px-3 py-2 bg-white border rounded text-indigo-600"><FaWhatsapp /> WhatsApp</a>
                    <a href="#" aria-label="Twitter" className="inline-flex items-center gap-2 px-3 py-2 bg-white border rounded text-indigo-600"><FaTwitter /> Twitter</a>
                  </div>
                </div>

                <div className="mt-4 text-sm text-green-600">{newsletterMsg}</div>
              </div>
            </div>
          </div>
        </section>
        </div>

        <aside className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold">Visit Us</h3>
              <p className="text-gray-600 text-sm mt-1">Watermark Business Park, Ndege Road, Karen – Nairobi, Kenya</p>
            </div>
            <div className="relative h-56">
              <iframe
                title="AAN Map"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.635383101955!2d36.7056!3d-1.3505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f05d9a4c1d9af%3A0x7d8a4f3b0a4b1c87!2sKaren%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1700000000000"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Gallery</h3>
            <div className="grid grid-cols-2 gap-3">
              <figure className="col-span-2">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-xl ring-1 ring-gray-200 shadow-sm">
                  <img src="/data center.jpg" alt="Data center" className="h-full w-full object-cover" />
                </div>
                <figcaption className="mt-2 text-sm text-gray-600">Network Infrastructure</figcaption>
              </figure>
              <figure>
                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-gray-200 shadow-sm">
                  <img src="/energy.jpg" alt="Energy" className="h-full w-full object-cover" />
                </div>
                <figcaption className="mt-2 text-sm text-gray-600">Energy Services</figcaption>
              </figure>
            </div>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
