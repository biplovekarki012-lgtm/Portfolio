import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ChevronDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onCursorEnter?: () => void;
  onCursorLeave?: () => void;
  onNavigateGallery?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onCursorEnter,
  onCursorLeave,
  onNavigateGallery
}) => {
  const [isHoveredText, setIsHoveredText] = useState(false);

  // Mouse parallax motion values (normalized -1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Different parallax depths for the typography layers
  const solidX = useTransform(smoothMouseX, [-1, 1], [-12, 12]);
  const solidY = useTransform(smoothMouseY, [-1, 1], [-8, 8]);

  const outlineX = useTransform(smoothMouseX, [-1, 1], [22, -22]);
  const outlineY = useTransform(smoothMouseY, [-1, 1], [14, -14]);

  const redRectX = useTransform(smoothMouseX, [-1, 1], [-6, 6]);
  const redRectY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);

  const ghostX = useTransform(smoothMouseX, [-1, 1], [-30, 30]);
  const ghostY = useTransform(smoothMouseY, [-1, 1], [-18, 18]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const letters = ['P', 'O', 'R', 'T', 'F', 'O', 'L', 'I', 'O'];

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-[#E2E2E2] bg-grain flex flex-col justify-between pt-28 pb-10 px-6 md:px-12 overflow-hidden select-none"
    >
      {/* Swiss Grid Crosshairs (+) distributed across the canvas */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <span className="absolute top-24 left-10 text-xs font-code text-[#111111]/30">+</span>
        <span className="absolute top-24 right-10 text-xs font-code text-[#111111]/30">+</span>
        <span className="absolute top-1/2 left-12 text-xs font-code text-[#111111]/30">+</span>
        <span className="absolute top-1/2 right-12 text-xs font-code text-[#111111]/30">+</span>
        <span className="absolute bottom-24 left-1/4 text-xs font-code text-[#111111]/20">+</span>
        <span className="absolute bottom-24 right-1/4 text-xs font-code text-[#111111]/20">+</span>
        <span className="absolute top-1/3 left-1/3 text-xs font-code text-[#111111]/15">+</span>
        <span className="absolute bottom-1/3 right-1/3 text-xs font-code text-[#111111]/15">+</span>
      </div>

      {/* Edge navigation arrows */}
      <div className="hidden lg:flex items-center justify-between absolute top-1/2 left-6 right-6 -translate-y-1/2 pointer-events-none z-10">
        <div className="flex items-center gap-2 text-[10px] font-code text-[#111111]/40 uppercase tracking-widest">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>INDEX</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-code text-[#111111]/40 uppercase tracking-widest">
          <span>GALLERY</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* TOP BAR / INTRODUCTION */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center max-w-7xl mx-auto w-full gap-4">
        {/* Top-left: WELCOME TO MY */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          <span className="text-xs md:text-sm font-bold tracking-[0.25em] text-[#111111] uppercase">
            WELCOME
          </span>
          <span className="text-xs md:text-sm font-bold tracking-[0.25em] text-[#111111] uppercase">
            TO MY
          </span>
        </motion.div>

        {/* Center/Right: Edition / CS Major Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-3 text-xs font-code text-[#777777]"
        >
          <span>VOL. 2026</span>
          <span>·</span>
          <span>SYSTEMS & INTERACTION</span>
          <span>·</span>
          <span className="text-[#E54838] font-bold">COLORADO</span>
        </motion.div>
      </div>

      {/* CENTER: THE ICONIC EXPERIMENTAL "PORTFOLIO" TYPOGRAPHY & VERTICAL RED RECTANGLE */}
      <div
        className="relative z-10 my-auto py-12 md:py-20 flex items-center justify-center w-full"
        onMouseEnter={() => {
          setIsHoveredText(true);
          if (onCursorEnter) onCursorEnter();
        }}
        onMouseLeave={() => {
          setIsHoveredText(false);
          if (onCursorLeave) onCursorLeave();
        }}
      >
        {/* TALL VERTICAL RED RECTANGLE (#E54838) */}
        <motion.div
          style={{ x: redRectX, y: redRectY }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2
          }}
          className="absolute w-16 sm:w-28 md:w-40 lg:w-48 h-[120%] md:h-[135%] bg-[#E54838] shadow-2xl z-0 origin-center"
        />

        {/* TYPOGRAPHY CONTAINER */}
        <div className="relative z-10 flex items-center justify-center w-full max-w-full px-2 sm:px-4">
          {/* LAYER 1: Distorted / Offset Ghost Layer */}
          <motion.div
            style={{ x: ghostX, y: ghostY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHoveredText ? 0.35 : 0.15 }}
            transition={{ duration: 0.4 }}
            className="absolute flex items-center justify-center font-display font-black text-[10vw] sm:text-[9.5vw] md:text-[8vw] lg:text-[7.5vw] xl:text-[7vw] tracking-[-0.03em] text-outline-red select-none pointer-events-none whitespace-nowrap"
            aria-hidden="true"
          >
            PORTFOLIO
          </motion.div>

          {/* LAYER 2: Outlined Version Behind (-webkit-text-stroke) */}
          <motion.div
            style={{ x: outlineX, y: outlineY }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="absolute flex items-center justify-center font-display font-black text-[10vw] sm:text-[9.5vw] md:text-[8vw] lg:text-[7.5vw] xl:text-[7vw] tracking-[-0.03em] text-outline-black select-none pointer-events-none whitespace-nowrap"
            aria-hidden="true"
          >
            PORTFOLIO
          </motion.div>

          {/* LAYER 3: Solid Black Foreground Typography with Staggered Letter Reveal */}
          <motion.h1
            style={{ x: solidX, y: solidY }}
            className="relative flex items-center justify-center font-display font-black text-[10vw] sm:text-[9.5vw] md:text-[8vw] lg:text-[7.5vw] xl:text-[7vw] tracking-[-0.03em] text-[#111111] leading-none select-none drop-shadow-sm whitespace-nowrap"
          >
            {letters.map((letter, index) => {
              // Custom directional slide-ins
              const initialY = index % 2 === 0 ? 90 : -90;
              const initialX = index % 3 === 0 ? -40 : 40;

              return (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: initialY, x: initialX, rotate: (index - 4) * 3 }}
                  animate={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.3 + index * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    y: -14,
                    color: index === 4 ? '#FFFFFF' : '#111111',
                    transition: { duration: 0.2 },
                  }}
                  className={`inline-block transition-colors ${
                    index === 3 || index === 4 || index === 5 ? 'text-[#111111]' : ''
                  }`}
                >
                  {letter}
                </motion.span>
              );
            })}
          </motion.h1>
        </div>
      </div>

      {/* SUPPORTING TAGLINE & BOTTOM BAR */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-6 pt-4 border-t border-[#111111]/15">
        {/* Supporting Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-xs md:text-sm font-extrabold tracking-[0.2em] text-[#111111] uppercase max-w-2xl mx-auto">
            {PERSONAL_INFO.tagline}
          </p>
        </motion.div>

        {/* Bottom Bar: Name & Identity & Scroll Trigger */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold tracking-wider uppercase">
          {/* Bottom-left: BIPLOV KARKI */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-[#111111]" />
            <span className="font-display font-extrabold text-[#111111] text-sm">
              {PERSONAL_INFO.name}
            </span>
          </motion.div>

          {/* Center: Scroll Down Indicator */}
          <motion.button
            onClick={() => {
              if (onNavigateGallery) {
                onNavigateGallery();
              } else {
                document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            onMouseEnter={onCursorEnter}
            onMouseLeave={onCursorLeave}
            className="flex items-center gap-2 text-[11px] font-code text-[#777777] hover:text-[#E54838] transition-colors py-1 group"
          >
            <span>EXPLORE GALLERY</span>
            <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1" />
          </motion.button>

          {/* Bottom-right: SOFTWARE DEVELOPER / CREATIVE TECHNOLOGIST */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="text-right text-[#777777] text-[11px] font-code"
          >
            <span>SOFTWARE DEVELOPER</span>
            <span className="text-[#E54838] mx-1.5">/</span>
            <span>CREATIVE TECHNOLOGIST</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
