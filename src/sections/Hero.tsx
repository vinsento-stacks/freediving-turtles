import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const headline = headlineRef.current;
    const subline = sublineRef.current;
    const cta = ctaRef.current;
    const scrollHint = scrollHintRef.current;

    if (!section || !bg || !headline || !subline || !cta || !scrollHint) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Background fade in with scale
      loadTl.fromTo(bg,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' }
      );

      // Headline words animation
      const words = headline.querySelectorAll('.word');
      loadTl.fromTo(words,
        { y: 40, opacity: 0, rotateX: 18 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.05 },
        '-=0.6'
      );

      // Subline fade in
      loadTl.fromTo(subline,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      // CTA buttons fade in
      loadTl.fromTo(cta,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      );

      // Scroll hint fade in
      loadTl.fromTo(scrollHint,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.2'
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([headline, subline, cta], { opacity: 1, x: 0, y: 0 });
            gsap.set(bg, { scale: 1, y: 0 });
          }
        }
      });

      // Phase 1 (0%-30%): Hold - no animation
      // Phase 2 (30%-70%): Settle - no animation
      // Phase 3 (70%-100%): Exit

      // Headline exit
      scrollTl.fromTo(headline,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      // Subline exit
      scrollTl.fromTo(subline,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      // CTA exit
      scrollTl.fromTo(cta,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      // Scroll hint exit
      scrollTl.fromTo(scrollHint,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.65
      );

      // Background parallax
      scrollTl.fromTo(bg,
        { scale: 1, y: 0 },
        { scale: 1.08, y: '-6vh', ease: 'none' },
        0.70
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="pinned-section relative z-10"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero_underwater.jpg"
          alt="Underwater scene"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 ocean-gradient-dark" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center section-padding">
        {/* Headline */}
        <div
          ref={headlineRef}
          className="max-w-[52vw] ml-[10vw] mt-[-4vh]"
        >
          <h1 className="text-[clamp(44px,5vw,76px)] leading-[0.95] text-white uppercase font-extrabold">
            <span className="word inline-block">TurTols</span>
            <br />
            <span className="word inline-block">Freediving</span>
            <br />
            <span className="word inline-block">Buddies</span>
          </h1>
        </div>

        {/* Subline */}
        <div
          ref={sublineRef}
          className="max-w-[34vw] ml-[10vw] mt-8"
          style={{ opacity: 0 }}
        >
          <p className="text-lg text-[#A9B6C7] leading-relaxed">
            A community built around breath, technique, and the quiet of the deep.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="ml-[10vw] mt-8 flex items-center gap-4"
          style={{ opacity: 0 }}
        >
          <button
            onClick={() => scrollToSection('courses')}
            className="btn-primary"
          >
            Explore courses
          </button>
          <button
            onClick={() => scrollToSection('schedule')}
            className="text-white/80 hover:text-white font-medium transition-colors underline underline-offset-4"
          >
            View schedule
          </button>
        </div>
      </div>

      {/* Scroll Hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-[4vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[#A9B6C7]">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-[#A9B6C7] animate-bounce" />
      </div>
    </section>
  );
}
