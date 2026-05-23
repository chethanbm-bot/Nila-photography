/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Camera, 
  Mail, 
  Phone, 
  Instagram, 
  Youtube, 
  MessageCircle, 
  Upload, 
  X, 
  ChevronRight,
  Lock,
  Menu,
  ArrowRight
} from 'lucide-react';

// --- Types ---

interface GalleryItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  category: 'Weddings' | 'Personal' | 'Events';
  title: string;
}

interface PricingPackage {
  name: string;
  details: string;
  price: string;
  featured?: boolean;
}

// --- Constants ---

const INITIAL_GALLERY: GalleryItem[] = [
  { id: '1', url: 'https://picsum.photos/seed/wedding1/800/1200', type: 'image', category: 'Weddings', title: 'Eternal Vows' },
  { id: '2', url: 'https://picsum.photos/seed/personal1/800/800', type: 'image', category: 'Personal', title: 'Soulful Portraits' },
  { id: '3', url: 'https://picsum.photos/seed/event1/1200/800', type: 'image', category: 'Events', title: 'Grand Celebrations' },
  { id: '4', url: 'https://picsum.photos/seed/wedding2/800/1000', type: 'image', category: 'Weddings', title: 'Golden Hour Love' },
  { id: '5', url: 'https://picsum.photos/seed/personal2/800/1200', type: 'image', category: 'Personal', title: 'Minimalist Grace' },
  { id: '6', url: 'https://picsum.photos/seed/event2/1000/800', type: 'image', category: 'Events', title: 'Midnight Gala' },
  { id: '7', url: 'https://picsum.photos/seed/wedding3/800/800', type: 'image', category: 'Weddings', title: 'The First Dance' },
  { id: '8', url: 'https://picsum.photos/seed/personal3/1000/1200', type: 'image', category: 'Personal', title: 'Urban Stories' },
];

const PRICING: PricingPackage[] = [
  { name: 'Basic Wedding Photo & Videography', details: 'Full day coverage', price: '₹1,00,000' },
  { name: 'Medium Wedding Photo & Videography', details: 'Premium coverage + editing', price: '₹2,00,000', featured: true },
  { name: 'Premium Wedding Photo & Videography', details: 'Cinematic full package', price: '₹3,00,000' },
  { name: 'Personal Photography (30 Photos)', details: 'Studio/outdoor shoot', price: '₹9,000' },
  { name: 'Personal Photo + Video (30 Photos + 30 Sec Video)', details: 'Combined package', price: '₹11,000' },
  { name: 'Special / Seat Packages', details: 'Custom requirements', price: 'Contact Directly' },
];

// --- Components ---

export default function App() {
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [password, setPassword] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Parallax effect for hero
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Chethan@8431') {
      setIsAdmin(true);
      setShowAdminModal(false);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newItem: GalleryItem = {
          id: Date.now().toString(),
          url: reader.result as string,
          type: file.type.startsWith('video') ? 'video' : 'image',
          category: 'Events', // Default
          title: 'New Capture'
        };
        setGallery([newItem, ...gallery]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const type = formData.get('type');
    const date = formData.get('date');
    const message = formData.get('message');

    const subject = `Booking Request - ${type}`;
    const body = `Full Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nEvent Type: ${type}\nPreferred Date: ${date}\n\nMessage:\n${message}`;
    
    window.location.href = `mailto:chethuzz334@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 5000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen relative">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-serif tracking-widest text-gold">NILA</a>
          
          <div className="hidden md:flex items-center space-x-12 text-sm uppercase tracking-[0.2em] font-medium">
            <a href="#about" className="hover:text-gold transition-colors">About</a>
            <a href="#portfolio" className="hover:text-gold transition-colors">Portfolio</a>
            <a href="#pricing" className="hover:text-gold transition-colors">Pricing</a>
            <a href="#booking" className="px-6 py-2 border border-gold/30 rounded-full hover:bg-gold hover:text-dark transition-all duration-300">Book Now</a>
          </div>

          <button 
            className="md:hidden text-cream"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-dark flex flex-col items-center justify-center space-y-8 text-2xl font-serif"
          >
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#portfolio" onClick={() => setMobileMenuOpen(false)}>Portfolio</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <a href="#booking" onClick={() => setMobileMenuOpen(false)} className="text-gold">Book Now</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark z-10" />
          <img 
            src="https://picsum.photos/seed/hero/1920/1080?blur=2" 
            className="w-full h-full object-cover scale-110"
            alt="Hero Background"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="relative z-20 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-7xl md:text-9xl font-serif mb-6 gold-underline inline-block"
          >
            Nila Photography
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl tracking-[0.3em] uppercase text-cream/70 mb-12"
          >
            Capturing Moments That Last Forever
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <a href="#portfolio" className="px-10 py-4 bg-gold text-dark font-semibold rounded-full hover:scale-105 transition-transform flex items-center gap-2">
              View Work <ChevronRight size={18} />
            </a>
            <a href="#booking" className="px-10 py-4 border border-cream/20 rounded-full hover:bg-cream/10 transition-all">
              Book a Session
            </a>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-gold/50"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-gold to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-dark relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-gold uppercase tracking-[0.4em] text-sm mb-4 block">The Vision</span>
            <h2 className="text-4xl md:text-6xl mb-8">Artistry in Every Frame</h2>
            <p className="text-lg md:text-xl text-cream/70 leading-relaxed font-light">
              Nila Photography is born from a deep-seated passion for visual storytelling. We specialize in weddings and personal portraiture, blending cinematic aesthetics with raw, emotional authenticity. Our mission is to preserve the fleeting beauty of your most cherished moments, turning them into timeless heirlooms.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 pt-12 border-t border-white/5">
            <div className="flex items-center justify-center gap-4 text-cream/80">
              <Phone size={20} className="text-gold" />
              <span className="tracking-wider">8431850273</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-cream/80">
              <Mail size={20} className="text-gold" />
              <span className="tracking-wider">chethuzz334@gmail.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 px-6 bg-[#0d0d0d] diagonal-divider">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="text-gold uppercase tracking-[0.4em] text-sm mb-4 block">Portfolio</span>
              <h2 className="text-5xl md:text-7xl">Selected Works</h2>
            </div>
            
            <div className="flex items-center gap-4">
              {!isAdmin ? (
                <button 
                  onClick={() => setShowAdminModal(true)}
                  className="text-xs uppercase tracking-widest text-cream/30 hover:text-gold transition-colors flex items-center gap-2"
                >
                  <Lock size={12} /> Admin Access
                </button>
              ) : (
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer bg-gold/10 text-gold border border-gold/20 px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-gold/20 transition-all">
                    <Upload size={16} /> Upload Media
                    <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*,video/*" />
                  </label>
                  <button onClick={() => setIsAdmin(false)} className="text-xs text-cream/30 hover:text-red-400">Logout</button>
                </div>
              )}
            </div>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {gallery.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group overflow-hidden rounded-lg cursor-pointer"
              >
                <img 
                  src={item.url} 
                  alt={item.title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-gold text-xs uppercase tracking-widest mb-2">{item.category}</span>
                  <h3 className="text-2xl font-serif">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-gold uppercase tracking-[0.4em] text-sm mb-4 block">Investment</span>
            <h2 className="text-5xl md:text-7xl">Packages</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRICING.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-10 rounded-2xl border ${pkg.featured ? 'border-gold bg-gold/5' : 'border-white/5 bg-white/5'} flex flex-col justify-between hover:border-gold/50 transition-all duration-500 group`}
              >
                <div>
                  <h3 className="text-2xl mb-4 group-hover:text-gold transition-colors">{pkg.name}</h3>
                  <p className="text-cream/50 mb-8 text-sm uppercase tracking-widest">{pkg.details}</p>
                </div>
                <div className="mt-auto">
                  <div className="text-3xl font-serif text-gold mb-6">{pkg.price}</div>
                  <a href="#booking" className={`w-full py-4 rounded-full text-center block transition-all ${pkg.featured ? 'bg-gold text-dark font-bold' : 'border border-gold/30 text-gold hover:bg-gold hover:text-dark'}`}>
                    Select Package
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-32 px-6 bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-gold uppercase tracking-[0.4em] text-sm mb-4 block">Reserve</span>
            <h2 className="text-5xl md:text-7xl mb-8">Book Your Session</h2>
            <p className="text-cream/60 text-lg mb-12 max-w-md">
              Ready to create something beautiful? Fill out the form below and we'll get back to you within 24 hours to discuss your vision.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-cream/40 uppercase tracking-widest">Call Us</p>
                  <p className="text-lg">8431850273</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-cream/40 uppercase tracking-widest">Email Us</p>
                  <p className="text-lg">chethuzz334@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/5 backdrop-blur-sm">
            <form onSubmit={handleBooking} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-cream/50">Full Name</label>
                  <input required name="name" type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-gold outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-cream/50">Email Address</label>
                  <input required name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-gold outline-none transition-all" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-cream/50">Phone Number</label>
                  <input required name="phone" type="tel" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-gold outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-cream/50">Event Type</label>
                  <select name="type" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-gold outline-none transition-all appearance-none">
                    <option className="bg-dark">Wedding</option>
                    <option className="bg-dark">Personal</option>
                    <option className="bg-dark">Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-cream/50">Preferred Date</label>
                <input required name="date" type="date" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-gold outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-cream/50">Message / Notes</label>
                <textarea name="message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-gold outline-none transition-all resize-none" />
              </div>
              
              <button type="submit" className="w-full py-4 bg-gold text-dark font-bold rounded-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                Send Booking Request <ArrowRight size={18} />
              </button>

              {bookingSuccess && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-green-400 text-sm"
                >
                  Your booking request has been sent! We'll contact you shortly.
                </motion.p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 border-t border-white/5 bg-dark">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-serif mb-4">Let's Connect</h2>
            <p className="text-cream/50 tracking-widest uppercase text-sm">Follow the journey on social media</p>
          </div>

          <div className="flex items-center gap-8">
            <a href="https://instagram.com" target="_blank" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all">
              <Instagram size={24} />
            </a>
            <a href="https://youtube.com" target="_blank" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all">
              <Youtube size={24} />
            </a>
            <a href="https://wa.me/918431850273" target="_blank" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all">
              <MessageCircle size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-dark border-t border-white/5 text-center">
        <div className="w-20 h-[1px] bg-gold/30 mx-auto mb-8" />
        <p className="text-cream/30 text-xs uppercase tracking-[0.3em]">
          © 2025 Nila Photography. All Rights Reserved.
        </p>
      </footer>

      {/* Admin Modal */}
      <AnimatePresence>
        {showAdminModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/5 p-10 rounded-3xl border border-white/10 max-w-md w-full relative"
            >
              <button 
                onClick={() => setShowAdminModal(false)}
                className="absolute top-6 right-6 text-cream/50 hover:text-cream"
              >
                <X size={24} />
              </button>
              <div className="text-center mb-8">
                <Lock className="mx-auto text-gold mb-4" size={40} />
                <h3 className="text-3xl font-serif">Admin Login</h3>
                <p className="text-cream/40 text-sm mt-2">Enter your credentials to manage the portfolio</p>
              </div>
              <form onSubmit={handleAdminLogin} className="space-y-6">
                <input 
                  autoFocus
                  type="password" 
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 outline-none focus:border-gold transition-all"
                />
                <button type="submit" className="w-full py-4 bg-gold text-dark font-bold rounded-lg hover:bg-gold/80 transition-all">
                  Access Dashboard
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
