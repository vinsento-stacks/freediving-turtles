import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock, Target } from 'lucide-react';

// FIX: Removed redundant gsap.registerPlugin(ScrollTrigger)

const courses = [
  {
    id: 1,
    title: 'Beginner (Wave 1)',
    description: 'Learn the fundamentals: breathing, equalization, and safe descent. Perfect for those new to freediving.',
    duration: '2 days',
    depth: '12–20m',
    image: '/course_beginner.jpg',
  },
  {
    id: 2,
    title: 'Intermediate (Wave 2)',
    description: 'Freefall, Frenzel, and technique refinement for deeper dives. Build confidence and extend your range.',
    duration: '3 days',
    depth: '24–30m',
    image: '/course_intermediate.jpg',
  },
  {
    id: 3,
    title: 'Advanced (Wave 3)',
    description: 'Mouthfill, training tables, and coaching toward competition depth. For serious freedivers.',
    duration: '4 days',
    depth: '32–40m',
    image: '/course_advanced.jpg',
  },
];

export default function Courses() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

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
            end: 'top 55%',
            scrub: 1,
          }
        }
      );

      const cardElements = cards.querySelectorAll('.course-card');
      gsap.fromTo(cardElements,
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            end: 'top 45%',
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
      id="courses"
      className="relative z-30 bg-[#0B1A2A] py-20 lg:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(18,38,63,0.4)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 section-padding max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <span className="eyebrow block mb-4">Courses</span>
          <h2 className="text-[clamp(34px,3.6vw,56px)] leading-[1.0] text-white uppercase font-bold mb-4">
            Train At Your Level
          </h2>
          <p className="text-[#A9B6C7] text-lg max-w-md mx-auto">
            Small groups. Clear progress. Real safety.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {courses.map((course) => (
            <div
              key={course.id}
              className="course-card group bg-[#12263F] rounded-[28px] overflow-hidden card-hover cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                {/* FIX: loading="lazy" on all below-fold card images */}
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12263F] to-transparent opacity-60" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  {course.title}
                </h3>
                <p className="text-[#A9B6C7] text-sm leading-relaxed mb-4">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 mb-4 text-sm text-[#A9B6C7]">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Target className="w-4 h-4" />
                    <span>{course.depth}</span>
                  </div>
                </div>

                <button className="flex items-center gap-2 text-[#FF6A3D] font-medium text-sm group/link">
                  See details
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
