import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Join() {
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
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Phase 1 (0%-30%): Entrance
      // Text block from left
      scrollTl.fromTo(textBlock,
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Card from right with rotation
      scrollTl.fromTo(card,
        { x: '60vw', rotate: 6, opacity: 0 },
        { x: 0, rotate: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // CTA buttons fade in
      const ctas = textBlock.querySelectorAll('.cta-btn');
      scrollTl.fromTo(ctas,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, ease: 'none' },
        0.18
      );

      // Caption fade in
      scrollTl.fromTo(caption,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.20
      );

      // Phase 2 (30%-70%): Settle - hold position

      // Phase 3 (70%-100%): Exit
      scrollTl.fromTo(textBlock,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(card,
        { y: 0, opacity: 1 },
        { y: '12vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(bg,
        { scale: 1 },
        { scale: 1.05, ease: 'none' },
        0.70
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="join"
      className="pinned-section relative z-20"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/join_diver.jpg"
          alt="Freediver facing camera"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 ocean-gradient-dark" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center">
        {/* Left Text Block */}
        <div
          ref={textBlockRef}
          className="ml-[10vw] w-[40vw]"
          style={{ opacity: 0 }}
        >
          <h2 className="text-[clamp(34px,3.6vw,56px)] leading-[1.0] text-white uppercase font-bold mb-6">
            <span className="block">Ready To</span>
            <span className="block">Go Deeper?</span>
          </h2>
          <p className="text-[#A9B6C7] text-base leading-relaxed mb-8 max-w-md">
            Join the crew for weekly sessions, workshops, and trips. 
            All levels welcome— from complete beginners to competitive freedivers.
          </p>
          <div className="flex items-center gap-4">
            <button className="cta-btn btn-primary">
              Become a member
            </button>
            <button className="cta-btn text-white/80 hover:text-white font-medium transition-colors underline underline-offset-4">
              Ask a question
            </button>
          </div>
        </div>

        {/* Right Floating Card */}
        <div
          ref={cardRef}
          className="absolute right-[10vw] top-[18vh] w-[32vw] h-[46vh] floating-card"
          style={{ opacity: 0 }}
        >
          <img
            src="/join_group.jpg"
            alt="Freediving community group"
            className="w-full h-full object-cover"
          />
          {/* Caption inside card */}
          <div
            ref={captionRef}
            className="absolute bottom-4 left-4"
            style={{ opacity: 0 }}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-white/80 bg-black/30 px-3 py-1.5 rounded-full">
              All Levels Welcome
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
