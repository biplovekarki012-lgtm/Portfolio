import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUpRight, GraduationCap, Code2, Compass, X, MapPin } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface AboutProps {
  onCursorEnter?: () => void;
  onCursorLeave?: () => void;
}

export const About: React.FC<AboutProps> = ({ onCursorEnter, onCursorLeave }) => {
  const [showBioModal, setShowBioModal] = useState(false);
  const [photoColor, setPhotoColor] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const photoContainerRef = useRef<HTMLDivElement>(null);
  const photoImgRef = useRef<HTMLImageElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const para1Ref = useRef<HTMLParagraphElement>(null);
  const para2Ref = useRef<HTMLParagraphElement>(null);
  const para3Ref = useRef<HTMLParagraphElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Section Header Kicker & Progress Bar
      if (kickerRef.current && progressBarRef.current) {
        gsap.from(kickerRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: kickerRef.current,
            start: 'top 85%',
          },
        });

        // Scroll reading progress line across the About section
        gsap.fromTo(
          progressBarRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            transformOrigin: 'left center',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: true,
            },
          }
        );
      }

      // 2. Editorial Masked Headline Reveal ("BEHIND THE CODE.")
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.headline-word');
        gsap.fromTo(
          words,
          {
            yPercent: 110,
            opacity: 0,
            rotate: 2,
          },
          {
            yPercent: 0,
            opacity: 1,
            rotate: 0,
            duration: 1,
            stagger: 0.14,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 82%',
            },
          }
        );
      }

      // 3. Portrait Image Progressive Reveal & Parallax Scrub
      if (photoContainerRef.current) {
        // Curtain clip reveal from bottom to top
        gsap.fromTo(
          photoContainerRef.current,
          {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            opacity: 0.5,
          },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: 1,
            duration: 1.3,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: photoContainerRef.current,
              start: 'top 78%',
            },
          }
        );

        // Subtle internal parallax on the photo as user scrolls through
        if (photoImgRef.current) {
          gsap.fromTo(
            photoImgRef.current,
            { yPercent: -8, scale: 1.08 },
            {
              yPercent: 8,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: photoContainerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }
      }

      // 4. Progressive Narrative Text Reveal (Scattered Stagger)
      const textElements = [para1Ref.current, para2Ref.current, para3Ref.current].filter(Boolean);
      textElements.forEach((el, index) => {
        if (!el) return;
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              // Adds subtle audio feedback when entering view if sound is on
              onEnter: () => {
                if (index === 0) soundManager.playTick(500, 0.02, 0.02);
              },
            },
          }
        );
      });

      // 5. Key Architecture Pillars Reveal
      if (pillarsRef.current) {
        const pillarCards = pillarsRef.current.children;
        gsap.fromTo(
          pillarCards,
          {
            opacity: 0,
            y: 40,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      // 6. Action Buttons Reveal
      if (actionsRef.current) {
        gsap.fromTo(
          actionsRef.current,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: actionsRef.current,
              start: 'top 90%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-[#E2E2E2] bg-grain py-24 px-6 md:px-12 border-t border-[#111111]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Reading Progress Line */}
        <div ref={kickerRef} className="relative pb-4 mb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#E54838]" />
              <span className="text-xs font-code font-bold tracking-widest uppercase text-[#777777]">
                SECTION 03 // PHILOSOPHY & IDENTITY
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-code text-[#777777] uppercase tracking-wider">
              <span>READING FLOW</span>
              <div className="w-24 h-[2px] bg-[#111111]/15 overflow-hidden relative">
                <div ref={progressBarRef} className="absolute inset-0 bg-[#E54838] origin-left" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Heading: BEHIND THE CODE. with Masked Word Reveal */}
        <h2
          ref={headingRef}
          className="text-4xl sm:text-6xl md:text-8xl font-display font-black tracking-tight text-[#111111] uppercase mb-12 md:mb-16 select-none"
        >
          <span className="inline-block overflow-hidden mr-3 sm:mr-5">
            <span className="headline-word inline-block">BEHIND</span>
          </span>
          <span className="inline-block overflow-hidden mr-3 sm:mr-5">
            <span className="headline-word inline-block">THE</span>
          </span>
          <span className="inline-block overflow-hidden">
            <span className="headline-word inline-block text-[#E54838]">CODE.</span>
          </span>
        </h2>

        {/* Editorial 2-Column Split: Visual Portrait + Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Left Column (5 Cols): Real Colorado Portrait of Biplov Karki with Progressive Reveal */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div
              ref={photoContainerRef}
              className="relative w-full aspect-[4/5] bg-[#111111] overflow-hidden border border-[#111111] group shadow-xl"
              onMouseEnter={() => {
                setPhotoColor(true);
                if (onCursorEnter) onCursorEnter();
              }}
              onMouseLeave={() => {
                setPhotoColor(false);
                if (onCursorLeave) onCursorLeave();
              }}
            >
              <img
                ref={photoImgRef}
                src={PERSONAL_INFO.photoUrl}
                alt="Biplov Karki in Colorado"
                className={`w-full h-full object-cover object-center transition-all duration-700 ${
                  photoColor ? 'filter grayscale-0' : 'filter grayscale contrast-115'
                }`}
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Geographic Tag */}
              <div className="absolute top-4 left-4 bg-[#E54838] text-white text-[10px] font-bold font-code px-2 py-0.5 uppercase tracking-widest flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                <span>TEXAS, USA</span>
              </div>

              {/* Bottom Card Title */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <p className="text-[10px] font-code text-[#E54838] tracking-widest uppercase">
                    COMPUTER SCIENCE
                  </p>
                  <p className="font-display font-extrabold text-lg md:text-xl tracking-tight">
                    BIPLOV KARKI
                  </p>
                </div>
                <button
                  onClick={() => setPhotoColor(!photoColor)}
                  className="text-[10px] font-code bg-white/20 hover:bg-white text-white hover:text-[#111111] px-2 py-1 transition-colors backdrop-blur-xs"
                >
                  {photoColor ? 'MONOCHROME' : 'COLOR'}
                </button>
              </div>
            </div>

            {/* Sub-caption */}
            <div className="flex items-center justify-between text-xs font-code text-[#777777] border-b border-[#111111]/10 pb-2">
              <span>PHOTO: COLORADO PASS</span>
              <span>BASED IN TEXAS, USA</span>
            </div>
          </div>

          {/* Right Column (7 Cols): Editorial Progressive Text Reveal */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            {/* Supporting Bio Text with Progressive Scroll Triggered Paragraphs */}
            <div className="space-y-6">
              <p
                ref={para1Ref}
                className="text-xl sm:text-2xl md:text-3xl font-display font-bold leading-snug text-[#111111]"
              >
                {PERSONAL_INFO.bioIntro}
              </p>

              <p
                ref={para2Ref}
                className="text-base md:text-lg text-[#444444] leading-relaxed"
              >
                Whether writing high-throughput concurrent orderbook simulators in Java,
                optimizing low-level C++ collision physics, or engineering multi-legged gait kinematics for my
                Raspberry Pi 4B Pi Crawler mini robot with Python and Scratch, I treat software engineering as both an exact science and an art form.
              </p>

              <p
                ref={para3Ref}
                className="text-sm md:text-base text-[#666666] leading-relaxed"
              >
                My focus centers on high-performance architecture, algorithmic efficiency, and
                responsive interfaces where zero-latency code meets boundary-pushing typography
                and spatial design.
              </p>
            </div>

            {/* Key Academic & Architectural Pillars */}
            <div
              ref={pillarsRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#111111]/15"
            >
              <div className="p-5 bg-white border border-[#111111]/10 flex flex-col justify-between shadow-xs hover:border-[#111111] transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-code font-bold text-[#E54838]">01 // SYSTEMS</span>
                  <Code2 className="w-4 h-4 text-[#111111]" />
                </div>
                <h4 className="font-display font-bold text-base text-[#111111] uppercase mb-1">
                  Algorithmic Rigor
                </h4>
                <p className="text-xs text-[#666666]">
                  Memory-conscious systems, lock-free concurrency, Big-O complexity analysis, and low-latency execution.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#111111]/10 flex flex-col justify-between shadow-xs hover:border-[#111111] transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-code font-bold text-[#E54838]">02 // INTERACTION</span>
                  <Compass className="w-4 h-4 text-[#111111]" />
                </div>
                <h4 className="font-display font-bold text-base text-[#111111] uppercase mb-1">
                  Creative Technology
                </h4>
                <p className="text-xs text-[#666666]">
                  WebGL canvas pipelines, Swiss editorial typography, kinetic physics, and tactile audio micro-interactions.
                </p>
              </div>
            </div>

            {/* Action Buttons: Revealed Progressively */}
            <div ref={actionsRef} className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  soundManager.playModalOpen();
                  setShowBioModal(true);
                }}
                onMouseEnter={onCursorEnter}
                onMouseLeave={onCursorLeave}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white hover:bg-[#E54838] transition-colors text-xs font-bold uppercase tracking-widest shadow-md group cursor-pointer"
              >
                <span>MORE ABOUT ME</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>

              <a
                href="#projects"
                className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#111111] hover:text-[#E54838] transition-colors border border-transparent hover:border-[#111111]/20"
              >
                VIEW PROJECTS →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Expanded Bio Modal */}
      <AnimatePresence>
        {showBioModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBioModal(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-3xl bg-[#E2E2E2] text-[#111111] p-6 md:p-10 border border-[#111111] shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-[#111111]/15 pb-4 mb-6">
                <div>
                  <span className="text-xs font-code font-bold bg-[#E54838] text-white px-2 py-0.5">
                    BIOGRAPHY & PHILOSOPHY
                  </span>
                  <h3 className="text-2xl font-display font-extrabold uppercase text-[#111111] mt-2">
                    BIPLOV KARKI
                  </h3>
                </div>

                <button
                  onClick={() => setShowBioModal(false)}
                  className="p-2 text-[#111111] hover:text-[#E54838] transition-colors cursor-pointer"
                  aria-label="Close bio modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Education & Academic Path */}
              <div className="space-y-6 text-sm text-[#222222]">
                <div className="p-4 bg-white border border-[#111111]/10">
                  <div className="flex items-center gap-2 text-xs font-bold font-code text-[#E54838] mb-1">
                    <GraduationCap className="w-4 h-4" /> ACADEMIC FOCUS
                  </div>
                  <h4 className="font-bold text-base text-[#111111]">
                    {PERSONAL_INFO.academicBio.degree}
                  </h4>
                  <p className="text-xs text-[#666666] mt-1">
                    Specializing in {PERSONAL_INFO.academicBio.focus}.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold tracking-widest uppercase text-[#111111] mb-2">
                    Core Philosophy
                  </h4>
                  <blockquote className="border-l-2 border-[#E54838] pl-4 italic text-[#444444]">
                    "{PERSONAL_INFO.academicBio.philosophy}"
                  </blockquote>
                </div>

                <div>
                  <h4 className="text-xs font-bold tracking-widest uppercase text-[#111111] mb-2">
                    Active Fields of Exploration
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PERSONAL_INFO.academicBio.interests.map((interest, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 bg-white border border-[#111111]/10 text-xs font-medium"
                      >
                        <span className="text-[#E54838] font-bold">›</span>
                        <span>{interest}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#111111]/15 flex justify-between items-center text-xs font-code text-[#777777]">
                  <span>LOCATION: TEXAS, USA</span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-[#E54838] font-bold hover:underline"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
