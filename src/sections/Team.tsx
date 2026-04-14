import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// FIX: Removed redundant gsap.registerPlugin(ScrollTrigger)

const teamMembers = [
  {
    id: 1,
    name: 'Marcus Chen',
    role: 'Head Instructor',
    certification: 'Molchanovs Wave 3',
    bio: '10+ years of freediving experience. Passionate about teaching technique and safety.',
    image: '/team_coach.jpg',
  },
  {
    id: 2,
    name: 'Sarah Williams',
    role: 'Pool Coach',
    certification: 'AIDA 4 Instructor',
    bio: 'Specializes in static apnea and pool disciplines. Former competitive swimmer.',
    image: '/discover_pool.jpg',
  },
  {
    id: 3,
    name: 'David Park',
    role: 'Depth Coach',
    certification: 'SSI Level 3',
    bio: 'Deep diving specialist. Focuses on equalization techniques and mental preparation.',
    image: '/course_advanced.jpg',
  },
];

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const teamGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const textBlock = textBlockRef.current;
    const card = cardRef.current;
    const caption = captionRef.current;
    const teamGrid = teamGridRef.current;

    if (!section || !bg || !textBlock || !card || !caption || !teamGrid) return;

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
        { y: 20, opacity: 0 },
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

      const teamCards = teamGrid.querySelectorAll('.team-card');
      gsap.fromTo(teamCards,
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: teamGrid,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="pinned-section relative z-20"
    >
      {/* FIX: will-change:transform on background for GPU compositing */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ willChange: 'transform' }}>
        <img
          src="/team_background.jpg"
          alt="Underwater swimmer"
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
          <span className="eyebrow block mb-4">Team</span>
          <h2 className="text-[clamp(34px,3.6vw,56px)] leading-[1.0] text-white uppercase font-bold mb-6">
            <span className="word inline-block">Meet</span>{' '}
            <span className="word inline-block">Your</span>
            <br />
            <span className="word inline-block">Instructors</span>
          </h2>
          <p className="text-[#A9B6C7] text-base leading-relaxed mb-8 max-w-md">
            Experienced, patient, and slightly obsessed with technique.
            Our team is here to guide you every step of the way.
          </p>
          <button className="btn-secondary">
            See full team
          </button>
        </div>

        <div
          ref={cardRef}
          className="absolute right-[10vw] top-[18vh] w-[32vw] h-[46vh] floating-card"
          style={{ opacity: 0 }}
        >
          <img
            src="/team_coach.jpg"
            alt="Head instructor"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div
            ref={captionRef}
            className="absolute bottom-4 left-4"
            style={{ opacity: 0 }}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-white/80 bg-black/30 px-3 py-1.5 rounded-full">
              Coach • Molchanovs
            </span>
          </div>
        </div>
      </div>

      <div
        ref={teamGridRef}
        className="absolute bottom-0 left-0 right-0 translate-y-full bg-[#0B1A2A] py-16 section-padding"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="team-card group bg-[#12263F] rounded-[28px] overflow-hidden card-hover cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12263F] to-transparent opacity-60" />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#FF6A3D] text-sm font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-[#A9B6C7] text-xs mb-3">
                    {member.certification}
                  </p>
                  <p className="text-[#A9B6C7] text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
