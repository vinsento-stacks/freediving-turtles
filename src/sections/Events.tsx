import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

// FIX: Removed redundant gsap.registerPlugin(ScrollTrigger)

const events = [
  {
    id: 1,
    title: 'Coral Garden Tour',
    date: 'Apr 12',
    description: 'Shallow reef freedive + marine ID',
    location: 'Coral Bay',
    image: '/event_coral.jpg',
  },
  {
    id: 2,
    title: 'Night Freediving Meetup',
    date: 'May 03',
    description: 'Bioluminescence session',
    location: 'Midnight Cove',
    image: '/event_night.jpg',
  },
];

export default function Events() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const tiles = tilesRef.current;

    if (!section || !header || !tiles) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(header,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 1,
          }
        }
      );

      const tileElements = tiles.querySelectorAll('.event-tile');
      tileElements.forEach((tile) => {
        const img = tile.querySelector('.tile-bg');

        gsap.fromTo(tile,
          { y: 50, opacity: 0, scale: 0.985 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: tile,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1,
            }
          }
        );

        // FIX: Was `scrub: true` (instant sync = max CPU).
        // Changed to `scrub: 0.5` to lerp with a 0.5s lag — same visual
        // effect but the browser can skip frames safely.
        if (img) {
          gsap.fromTo(img,
            { y: -12 },
            {
              y: 12,
              ease: 'none',
              scrollTrigger: {
                trigger: tile,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
              }
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative z-30 bg-[#0B1A2A] py-20 lg:py-28"
    >
      <div className="relative z-10 section-padding max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-12">
          <span className="eyebrow block mb-4">Events</span>
          <h2 className="text-[clamp(34px,3.6vw,56px)] leading-[1.0] text-white uppercase font-bold mb-4">
            Trips & Meetups
          </h2>
          <p className="text-[#A9B6C7] text-lg max-w-md mx-auto">
            Explore new spots. Dive with buddies.
          </p>
        </div>

        <div ref={tilesRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="event-tile group relative h-[34vh] min-h-[280px] rounded-[28px] overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 overflow-hidden">
                {/* FIX: loading="lazy" + will-change:transform on parallax images */}
                <img
                  src={event.image}
                  alt={event.title}
                  className="tile-bg w-full h-[calc(100%+24px)] object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ marginTop: '-12px', willChange: 'transform' }}
                  loading="lazy"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A2A] via-[#0B1A2A]/40 to-transparent" />

              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 bg-[#FF6A3D] text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    <Calendar className="w-3 h-3" />
                    {event.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {event.title}
                </h3>

                <p className="text-[#A9B6C7] text-sm mb-4">
                  {event.description}
                </p>

                <button className="inline-flex items-center gap-2 text-[#FF6A3D] font-medium text-sm w-fit group/link">
                  Join the event
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
