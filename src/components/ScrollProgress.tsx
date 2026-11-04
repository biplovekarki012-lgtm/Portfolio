import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { soundManager } from '../utils/sound';

interface SectionMarker {
  id: string;
  label: string;
  number: string;
}

const SECTIONS: SectionMarker[] = [
  { id: 'hero', label: 'HERO', number: '01' },
  { id: 'gallery', label: 'GALLERY', number: '02' },
  { id: 'about', label: 'ABOUT', number: '03' },
  { id: 'skills', label: 'SKILLS', number: '04' },
  { id: 'projects', label: 'PROJECTS', number: '05' },
  { id: 'contact', label: 'CONTACT', number: '06' },
];

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeSection, setActiveSection] = useState<string>('hero');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [percent, setPercent] = useState<number>(0);

  // Height percentage string for the filling bar
  const heightTransform = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setPercent(Math.round(latest * 100));
    });

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollYProgress]);

  const scrollTo = (id: string) => {
    soundManager.playSnap();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-40 flex items-center gap-3 select-none pointer-events-auto">
      {/* Dynamic Hover Tooltip on Section Nodes */}
      {hoveredSection && (
        <div className="hidden lg:block bg-[#111111] text-white text-[10px] font-code font-bold tracking-widest px-2.5 py-1 border border-white/20 shadow-xl whitespace-nowrap">
          {SECTIONS.find((s) => s.id === hoveredSection)?.number} //{' '}
          {SECTIONS.find((s) => s.id === hoveredSection)?.label}
        </div>
      )}

      {/* Main Track & Fill Container */}
      <div className="relative flex flex-col items-center">
        {/* Top Current Percentage Tag */}
        <div className="hidden sm:block text-[9px] font-code font-bold text-[#111111]/70 mb-2 tabular-nums">
          {percent}%
        </div>

        {/* Vertical Rail */}
        <div className="relative w-[3px] h-48 md:h-64 bg-[#111111]/15 rounded-full overflow-hidden">
          {/* Dynamic Red Fill Bar */}
          <motion.div
            style={{ height: heightTransform }}
            className="w-full bg-[#E54838] origin-top"
          />
        </div>

        {/* Interactive Section Waypoints / Tick Nodes */}
        <div className="absolute top-6 bottom-0 w-full flex flex-col justify-between items-center pointer-events-none">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                aria-label={`Scroll to ${section.label}`}
                className="pointer-events-auto group relative -mx-2 p-1.5 focus:outline-none"
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-2.5 h-2.5 bg-[#E54838] ring-2 ring-[#E54838]/30 scale-125'
                      : 'bg-[#111111]/30 hover:bg-[#111111] group-hover:scale-150'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
