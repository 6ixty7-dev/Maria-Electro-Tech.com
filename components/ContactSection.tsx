'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CONTACT_INFO } from '@/lib/constants';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    locality: 'kakkanad',
    service: 'electrician',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate dynamic submit and redirect to WhatsApp pre-filled with this request details:
    const text = `Hello Maria Electro Tech, I would like to book a service.\n\n*Name*: ${formData.name}\n*Phone*: ${formData.phone}\n*Locality*: ${formData.locality.toUpperCase()}\n*Service*: ${formData.service.toUpperCase()}\n*Details*: ${formData.message}`;
    const whatsappUrl = `https://wa.me/919847192829?text=${encodeURIComponent(text)}`;
    
    setSubmitted(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setSubmitted(false);
    }, 1000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="contact" className="py-20 bg-transparent border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-8 sm:space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          
          {/* Contact Details & Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-primary font-bold text-xs uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full w-fit">
                Instant Response
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-on-background">
                Let’s Get Your Home <span className="text-primary">Back to Perfect.</span>
              </h2>
              <p className="text-secondary text-sm md:text-base leading-relaxed">
                Connect with our Edappally dispatch center directly. Drop us a quick message on WhatsApp or click to call. We are standing by to assist you.
              </p>
            </div>

            {/* Direct Booking Cards */}
            <div className="space-y-4">
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
                onMouseMove={handleMouseMove}
                className="glass-panel spring-hover bg-white/40 border border-white/50 flex items-center gap-4 p-4 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.02)] transition-all block group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    phone_in_talk
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-primary uppercase tracking-wider">Click to Call</p>
                  <h4 className="font-bold text-base text-on-background group-hover:text-primary transition-colors">
                    {CONTACT_INFO.phone}
                  </h4>
                </div>
              </a>

              <a
                href={CONTACT_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMouseMove}
                className="glass-panel spring-hover bg-white/40 border border-white/50 flex items-center gap-4 p-4 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.02)] transition-all block group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center">
                  {/* WhatsApp SVG */}
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.94 14.07 .987 11.472.987 6.035.987 1.611 5.358 1.608 10.789c-.001 1.7.452 3.357 1.31 4.822l-.994 3.633 3.733-.99z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-[#25D366] uppercase tracking-wider">WhatsApp Dispatch</p>
                  <h4 className="font-bold text-base text-on-background group-hover:text-[#25D366] transition-colors">
                    Click to Open Chat
                  </h4>
                </div>
              </a>
            </div>

            {/* Premium Coverage Map Overlay */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/9] border border-white/50 shadow-md">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoW_l-8elht7OllsE0CW8Qw7q3eR8dhDM-Py5P54BY66pVdoTIQuPYuv5TEki24XHYuYdmYfhHMt9aLM7lr4XcRpXvzSfT67l1aRHtThg-CNwz89uRw6g1h-Uem0pLjks_B3kcqAyJVfRFu8fdOwLfS9kXke5gHdH-p1XsgRVr-KknhnnPssBl8gRWTt8LTXlEiRhs9VR9-b5poyEOOSCCL2a-eQO6lrML8BZYNkvCSXRZIBR5HcNfBfUfusdfqU3eGEkPRKzt5_8"
                alt="Kochi Ernakulam Service Territory Map"
                className="w-full h-full object-cover grayscale opacity-60"
              />
              <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                <div className="glass-panel px-5 py-2.5 rounded-full flex items-center gap-2 shadow-md bg-white/60 border border-white/60">
                  <span className="material-symbols-outlined text-primary font-bold text-lg select-none animate-pulse">
                    location_on
                  </span>
                  <span className="font-bold text-xs sm:text-sm text-on-background">Serving all Ernakulam Districts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Clean Offline Form */}
          <div className="glass-panel bg-white/50 border border-white/60 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl">
            <h3 className="text-xl font-bold text-on-background mb-1">Schedule a Visit</h3>
            <p className="text-secondary text-xs mb-6">
              Complete this brief form. Submitting will instantly prepare your WhatsApp booking ticket.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-extrabold uppercase text-on-surface-variant mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kurian Joseph"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-white/60 bg-white/40 text-sm focus:outline-none focus:border-primary transition-colors focus:bg-white/80"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase text-on-surface-variant mb-1">WhatsApp / Contact Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-white/60 bg-white/40 text-sm focus:outline-none focus:border-primary transition-colors focus:bg-white/80"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold uppercase text-on-surface-variant mb-1">Your Locality</label>
                  <select
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-white/60 bg-white/40 text-xs focus:outline-none focus:border-primary transition-colors focus:bg-white/80"
                  >
                    <option value="kakkanad">Kakkanad</option>
                    <option value="edappally">Edappally</option>
                    <option value="vyttila">Vyttila</option>
                    <option value="palarivattom">Palarivattom</option>
                    <option value="panampilly-nagar">Panampilly Nagar</option>
                    <option value="aluva">Aluva</option>
                    <option value="fort-kochi">Fort Kochi</option>
                    <option value="tripunithura">Tripunithura</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold uppercase text-on-surface-variant mb-1">Required Service</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-white/60 bg-white/40 text-xs focus:outline-none focus:border-primary transition-colors focus:bg-white/80"
                  >
                    <option value="electrician">Electrical Repair</option>
                    <option value="plumber">Plumbing Repair</option>
                    <option value="inverter-installation">Inverter Installation</option>
                    <option value="cctv-setup">CCTV Setup</option>
                    <option value="home-maintenance">Maintenance Plan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase text-on-surface-variant mb-1">Service Details (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Tell us briefly about the problem..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-white/60 bg-white/40 text-sm focus:outline-none focus:border-primary transition-colors focus:bg-white/80"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-primary hover:bg-primary-container text-white font-bold text-xs rounded-xl shadow-md spring-hover active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">send</span>
                {submitted ? 'Opening WhatsApp...' : 'Submit Booking to WhatsApp'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
