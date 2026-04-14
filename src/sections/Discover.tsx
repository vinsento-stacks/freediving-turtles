import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// FIX: Removed redundant gsap.registerPlugin(ScrollTrigger)

export default function Discover() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const textBlock = textBlockRef.current;
    const card = cardRef.current;
    const caption = captionRef.current;

    if (!section || !bg || !textBlock || !card || !caption) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      scrollTl.fromTo(textBlock,
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      const words = textBlock.querySelectorAll('.word');
      scrollTl.fromTo(words,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
        0.08
      );

      scrollTl.fromTo(card,
        { x: '60vw', rotate: 6, opacity: 0 },
        { x: 0, rotate: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(caption,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      scrollTl.fromTo(textBlock,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(card,
        { x: 0, rotate: 0, opacity: 1 },
        { x: '22vw', rotate: -4, opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(bg,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-4vh', ease: 'none' },
        0.70
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="discover"
      className="pinned-section relative z-20"
    >
      {/* FIX: will-change:transform on bg wrapper for GPU compositing */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ willChange: 'transform' }}>
        {/* FIX: loading="lazy" — below the fold on load */}
        <img
          src="/discover_background.jpg"
          alt="Underwater light rays"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 ocean-gradient-dark" />
      </div>

      <div className="relative z-10 w-full h-full flex items-center">
        <div
          ref={textBlockRef}
          className="ml-[10vw] w-[40vw]"
          style={{ opacity: 0 }}
        >
          <span className="eyebrow block mb-4">Discover</span>
          <h2 className="text-[clamp(34px,3.6vw,56px)] leading-[1.0] text-white uppercase font-bold mb-6">
            <span className="word inline-block">One</span>{' '}
            <span className="word inline-block">Breath</span>
            <br />
            <span className="word inline-block">Changes</span>
            <br />
            <span className="word inline-block">Everything</span>
          </h2>
          <p className="text-[#A9B6C7] text-base leading-relaxed mb-8 max-w-md">
            Freediving is not about pushing limits—it's about learning to be comfortable
            in the unknown. We teach technique, safety, and calm so you can explore
            deeper with confidence.
          </p>
          <button className="btn-secondary">
            Read our story
          </button>
        </div>

        <div
          ref={cardRef}
          className="absolute right-[10vw] top-[18vh] w-[32vw] h-[46vh] floating-card"
          style={{ opacity: 0 }}
        >
          <img
            src="/discover_pool.jpg"
            alt="Pool training session"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div
            ref={captionRef}
            className="absolute bottom-4 left-4"
            style={{ opacity: 0 }}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-white/80 bg-black/30 px-3 py-1.5 rounded-full">
              Pool Sessions • Weekly
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
