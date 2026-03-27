import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const scheduleData = [
  {
    day: 'Tuesday',
    time: '19:00',
    activity: 'Pool Technique',
    location: 'Aquatic Center',
    highlight: false,
  },
  {
    day: 'Thursday',
    time: '19:00',
    activity: 'Pool + Static',
    location: 'Aquatic Center',
    highlight: false,
  },
  {
    day: 'Saturday',
    time: '08:00',
    activity: 'Open Water',
    location: 'Bay Entry A',
    highlight: true,
  },
  {
    day: 'Sunday',
    time: '09:00',
    activity: 'Open Water + BBQ',
    location: 'Bay Entry B',
    highlight: false,
  },
];

export default function Schedule() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const rows = rowsRef.current;

    if (!section || !header || !rows) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(header,
        { x: -30, opacity: 0 },
        {
          x: 0,
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

      // Rows stagger animation
      const rowElements = rows.querySelectorAll('.schedule-row');
      gsap.fromTo(rowElements,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rows,
            start: 'top 75%',
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
      id="schedule"
      className="relative z-30 bg-[#12263F] py-20 lg:py-28"
    >
      <div className="relative z-10 section-padding max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <span className="eyebrow block mb-4">Schedule</span>
          <h2 className="text-[clamp(34px,3.6vw,56px)] leading-[1.0] text-white uppercase font-bold mb-4">
            Weekly Rhythm
          </h2>
          <p className="text-[#A9B6C7] text-lg max-w-md">
            Pool sessions, open water, and community meetups.
          </p>
        </div>

        {/* Schedule Grid */}
        <div ref={rowsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {scheduleData.map((item, index) => (
            <div
              key={index}
              className={`schedule-row group p-6 rounded-[20px] transition-all duration-300 cursor-pointer ${
                item.highlight
                  ? 'bg-[#FF6A3D]/10 border-l-4 border-[#FF6A3D]'
                  : 'bg-[#0B1A2A]/50 hover:bg-[#0B1A2A]/80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Day & Time */}
                <div className="flex items-center gap-4">
                  <div className="w-24">
                    <span className="text-white font-bold">{item.day}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#A9B6C7]">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{item.time}</span>
                  </div>
                </div>

                {/* Activity */}
                <div className="flex-1">
                  <span className="text-white font-medium">{item.activity}</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-[#A9B6C7]">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-8 p-4 bg-[#0B1A2A]/50 rounded-[14px]">
          <p className="text-sm text-[#A9B6C7]">
            <span className="text-[#FF6A3D] font-medium">*</span> Sessions are subject to weather conditions. 
            Join our WhatsApp group for real-time updates.
          </p>
        </div>
      </div>
    </section>
  );
}
