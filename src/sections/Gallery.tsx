import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// FIX: Removed redundant gsap.registerPlugin(ScrollTrigger)

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const headline = headlineRef.current;
    const card = cardRef.current;
    const caption = captionRef.current;

    if (!section || !bg || !headline || !card || !caption) return;

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

      scrollTl.fromTo(headline,
        { y: '-40vh', opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      const words = headline.querySelectorAll('.word');
      scrollTl.fromTo(words,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, ease: 'none' },
        0.10
      );

      scrollTl.fromTo(card,
        { x: '60vw', rotate: 8, opacity: 0 },
        { x: 0, rotate: 0, opacity: 1, ease: 'none' },
        0.08
      );

      scrollTl.fromTo(caption,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.20
      );

      scrollTl.fromTo(headline,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(card,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(bg,
        { scale: 1 },
        { scale: 1.06, ease: 'none' },
        0.70
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="pinned-section relative z-20"
    >
      {/* FIX: will-change:transform on background for GPU compositing */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ willChange: 'transform' }}>
        <img
          src="/gallery_group.jpg"
          alt="Freediving community"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 ocean-gradient-dark" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-start pt-[18vh]">
        <div
          ref={headlineRef}
          className="text-center"
          style={{ opacity: 0 }}
        >
          <h2 className="text-[clamp(44px,5vw,76px)] leading-[0.95] text-white uppercase font-extrabold">
            <span className="word inline-block">Diving</span>{' '}
            <span className="word inline-block">Is</span>
            <br />
            <span className="word inline-block">Better</span>
            <br />
            <span className="word inline-block">Together</span>
          </h2>
        </div>

        <div
          ref={cardRef}
          className="absolute right-[8vw] bottom-[12vh] w-[30vw] h-[34vh] min-w-[280px] min-h-[240px] floating-card"
          style={{ opacity: 0 }}
        >
          <img
            src="/gallery_training.jpg"
            alt="Training moment"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div
            ref={captionRef}
            className="absolute bottom-4 left-4"
            style={{ opacity: 0 }}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-white/80 bg-black/30 px-3 py-1.5 rounded-full">
              Training • Safety • Fun
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
