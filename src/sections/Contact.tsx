import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Send, Instagram, Youtube, MessageCircle } from 'lucide-react';

// FIX: Removed redundant gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;

    if (!section || !leftCol || !rightCol) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(leftCol,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 1,
          }
        }
      );

      gsap.fromTo(rightCol,
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 1,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-30 bg-[#0B1A2A] py-20 lg:py-28"
    >
      <div className="relative z-10 section-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div ref={leftColRef}>
            <span className="eyebrow block mb-4">Contact</span>
            <h2 className="text-[clamp(34px,3.6vw,56px)] leading-[1.0] text-white uppercase font-bold mb-8">
              Get In Touch
            </h2>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#12263F] flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#FF6A3D]" />
                </div>
                <div>
                  <p className="text-[#A9B6C7] text-sm">Email us</p>
                  <p className="text-white font-medium">hello@turtols.freedive</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#12263F] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#FF6A3D]" />
                </div>
                <div>
                  <p className="text-[#A9B6C7] text-sm">Location</p>
                  <p className="text-white font-medium">Based in • Running sessions weekly</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[#A9B6C7] text-sm mb-4">Follow us</p>
              <div className="flex items-center gap-3">
                {[Instagram, Youtube, MessageCircle].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-12 h-12 rounded-full bg-[#12263F] flex items-center justify-center text-white/70 hover:text-[#FF6A3D]"
                    style={{ transition: 'color 200ms ease-out, transform 200ms ease-out' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div ref={rightColRef}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-[#A9B6C7] text-sm mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#12263F] border border-[#1e3a5f] rounded-[14px] px-4 py-3 text-white placeholder-[#A9B6C7]/50 focus:outline-none focus:border-[#FF6A3D] focus:ring-1 focus:ring-[#FF6A3D]"
                  style={{ transition: 'border-color 200ms ease-out, box-shadow 200ms ease-out' }}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[#A9B6C7] text-sm mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#12263F] border border-[#1e3a5f] rounded-[14px] px-4 py-3 text-white placeholder-[#A9B6C7]/50 focus:outline-none focus:border-[#FF6A3D] focus:ring-1 focus:ring-[#FF6A3D]"
                  style={{ transition: 'border-color 200ms ease-out, box-shadow 200ms ease-out' }}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[#A9B6C7] text-sm mb-2">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-[#12263F] border border-[#1e3a5f] rounded-[14px] px-4 py-3 text-white placeholder-[#A9B6C7]/50 focus:outline-none focus:border-[#FF6A3D] focus:ring-1 focus:ring-[#FF6A3D] resize-none"
                  style={{ transition: 'border-color 200ms ease-out, box-shadow 200ms ease-out' }}
                  placeholder="Tell us about your freediving goals..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitted ? <>Message sent!</> : <><Send className="w-4 h-4" /> Send message</>}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-[#1e3a5f]/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#A9B6C7] text-sm">
              © TurTols Freediving Buddies. Safe diving, always.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-[#A9B6C7] text-sm hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-[#A9B6C7] text-sm hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
