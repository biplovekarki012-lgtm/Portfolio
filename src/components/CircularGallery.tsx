import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { Project } from '../types/portfolio';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { ProjectArt } from './ProjectArt';
import { soundManager } from '../utils/sound';

interface CircularGalleryProps {
  onSelectProject: (project: Project) => void;
  onCursorModeChange?: (mode: 'default' | 'hover' | 'drag' | 'view') => void;
  onNavigateAbout?: () => void;
}

export const CircularGallery: React.FC<CircularGalleryProps> = ({
  onSelectProject,
  onCursorModeChange,
  onNavigateAbout,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [targetAngle, setTargetAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartAngle, setDragStartAngle] = useState(0);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const totalCards = PROJECTS.length;
  const anglePerCard = 360 / totalCards;

  // Active index calculation based on target angle
  const normalizedAngle = ((targetAngle % 360) + 360) % 360;
  const activeIndex = Math.round(normalizedAngle / anglePerCard) % totalCards;
  const activeProject = PROJECTS[activeIndex];

  const targetAngleRef = useRef(0);
  const currentAngleRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartAngleRef = useRef(0);
  const lastXRef = useRef(0);
  const lastDragSoundXRef = useRef(0);
  const velocityRef = useRef(0);
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Persistent 60/120fps RAF loop that never cancels or restarts on state changes
  useEffect(() => {
    let animId: number;

    const loop = () => {
      const diff = targetAngleRef.current - currentAngleRef.current;

      if (Math.abs(diff) > 0.005) {
        // While dragging: responsive follow-through (0.22)
        // Coasting / snapping: silky-smooth fluid deceleration (0.08)
        const factor = isDraggingRef.current ? 0.22 : 0.085;
        currentAngleRef.current += diff * factor;
        setCurrentAngle(currentAngleRef.current);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Smooth mouse wheel rotation with gentle momentum and auto-snap
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * 0.06;
      targetAngleRef.current += delta;
      setTargetAngle(targetAngleRef.current);
      soundManager.playSmoothDrag(delta);

      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = setTimeout(() => {
        const snapped = Math.round(targetAngleRef.current / anglePerCard) * anglePerCard;
        targetAngleRef.current = snapped;
        setTargetAngle(snapped);
      }, 240);
    },
    [anglePerCard]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    };
  }, [handleWheel]);

  // Pointer drag handling (mouse & touch) - fully responsive and silky smooth
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    setIsDragging(true);

    dragStartXRef.current = e.clientX;
    dragStartAngleRef.current = targetAngleRef.current;
    lastXRef.current = e.clientX;
    lastDragSoundXRef.current = e.clientX;
    velocityRef.current = 0;

    if (onCursorModeChange) onCursorModeChange('drag');
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const dx = e.clientX - lastXRef.current;
    velocityRef.current = dx;
    lastXRef.current = e.clientX;

    const totalDeltaX = e.clientX - dragStartXRef.current;
    // Calibrated sensitivity: 0.175 degrees per px (1 card advance per ~290px of drag)
    const sensitivity = 0.175;
    const newTarget = dragStartAngleRef.current - totalDeltaX * sensitivity;

    targetAngleRef.current = newTarget;
    setTargetAngle(newTarget);

    // Smooth, velvety drag sound: triggers at calm, deliberate distance intervals (~120px)
    // with smooth envelope and gentle pacing, so it never sounds fast or frantic
    if (Math.abs(e.clientX - lastDragSoundXRef.current) >= 120) {
      soundManager.playSmoothDrag(dx);
      lastDragSoundXRef.current = e.clientX;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    if (onCursorModeChange) onCursorModeChange('default');
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignore
    }

    // Natural inertia throw based on release speed
    const releaseThrow = -velocityRef.current * 0.8;
    const projectedAngle = targetAngleRef.current + releaseThrow;
    const snapped = Math.round(projectedAngle / anglePerCard) * anglePerCard;

    targetAngleRef.current = snapped;
    setTargetAngle(snapped);
    soundManager.playCardFlip();
  };

  const rotateTo = (index: number) => {
    soundManager.playSmoothDrag(2);
    const newAngle = index * anglePerCard;
    targetAngleRef.current = newAngle;
    setTargetAngle(newAngle);
  };

  const nextCard = () => {
    soundManager.playSmoothDrag(2);
    const newAngle = targetAngleRef.current + anglePerCard;
    targetAngleRef.current = newAngle;
    setTargetAngle(newAngle);
  };

  const prevCard = () => {
    soundManager.playSmoothDrag(-2);
    const newAngle = targetAngleRef.current - anglePerCard;
    targetAngleRef.current = newAngle;
    setTargetAngle(newAngle);
  };

  return (
    <section
      id="gallery"
      className="relative w-full min-h-screen bg-[#E2E2E2] bg-grain py-20 px-4 md:px-8 flex flex-col justify-between overflow-hidden select-none border-t border-[#111111]/15"
    >
      {/* Background Section Header */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-4 z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[#E54838]" />
            <span className="text-xs font-code font-bold tracking-widest uppercase text-[#777777]">
              SECTION 02 // INTERACTIVE CAROUSEL
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase text-[#111111] tracking-tight">
            CIRCULAR GALLERY
          </h2>
        </div>

        <div className="flex flex-col items-start md:items-end text-xs font-code text-[#777777]">
          <span className="text-[#111111] font-bold">DRAG OR USE ARROWS TO ROTATE</span>
          <span>CLICK ANY CARD FOR DEEP ARCHITECTURE</span>
        </div>
      </div>

      {/* THE CIRCULAR FAN-SHAPED GALLERY VIEWPORT */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => {
          if (onCursorModeChange) onCursorModeChange('drag');
        }}
        onMouseLeave={() => {
          if (onCursorModeChange) onCursorModeChange('default');
        }}
        className="relative w-full h-[540px] sm:h-[620px] md:h-[680px] my-6 flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
      >
        {/* INVISIBLE CENTRAL PIVOT WITH ROTATING CARD FAN */}
        <div className="relative w-0 h-0 flex items-center justify-center">
          {PROJECTS.map((project, index) => {
            // Compute angular offset relative to current smooth angle
            const cardAngle = index * anglePerCard;
            let diff = (cardAngle - currentAngle) % 360;
            if (diff > 180) diff -= 360;
            if (diff < -180) diff += 360;

            const rad = (diff * Math.PI) / 180;

            // Geometry of the fan arc around pivot
            const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 240 : 380;
            const x = radius * Math.sin(rad);
            // Arc curve: cards at top are closest; cards bend backward
            const y = -radius * (1 - Math.cos(rad)) * 0.45;
            
            // Subtle rotation angle of the card
            const rotateZ = diff * 0.85;

            // Depth layering: active card (diff near 0) gets highest z-index
            const zIndex = Math.round(50 - Math.abs(diff) / 4);
            const scale = Math.max(0.65, 1.05 - Math.abs(diff) / 280);
            const opacity = Math.max(0.3, 1 - Math.abs(diff) / 160);
            const isHovered = hoveredCardId === project.id;

            return (
              <motion.div
                key={project.id}
                style={{
                  position: 'absolute',
                  transform: `translate3d(${x}px, ${y}px, 0px) rotate(${rotateZ}deg) scale(${isHovered ? scale * 1.08 : scale})`,
                  zIndex: isHovered ? 60 : zIndex,
                  opacity: opacity,
                  transformOrigin: 'center bottom',
                }}
                onMouseEnter={() => {
                  soundManager.playHover();
                  setHoveredCardId(project.id);
                  if (onCursorModeChange) onCursorModeChange('view');
                }}
                onMouseLeave={() => {
                  setHoveredCardId(null);
                  if (onCursorModeChange) onCursorModeChange('drag');
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  soundManager.playCardFlip();
                  onSelectProject(project);
                }}
                className="w-56 sm:w-64 md:w-72 aspect-[3/4] bg-[#111111] text-white p-3 md:p-3.5 flex flex-col justify-between shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45)] hover:shadow-[0_35px_60px_-15px_rgba(229,72,56,0.35)] transition-shadow duration-300 group border border-white/10"
              >
                {/* Card Artwork / Preview */}
                <div className="w-full h-3/5 overflow-hidden relative bg-black/40 border border-white/5">
                  <ProjectArt
                    type={project.visualType}
                    image={project.image}
                    title={project.title}
                    number={project.number}
                  />
                  {/* Subtle View Indicator on Hover */}
                  <div className="absolute inset-0 bg-[#E54838]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="bg-[#111111] text-white text-[10px] font-bold tracking-widest px-3 py-1 flex items-center gap-1 shadow-md">
                      <Eye className="w-3 h-3" /> OPEN
                    </span>
                  </div>
                </div>

                {/* Card Metadata */}
                <div className="pt-3 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-code text-[#E54838] mb-1">
                      <span className="uppercase tracking-widest">{project.category}</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="font-display font-bold text-sm md:text-base text-white line-clamp-1 group-hover:text-[#E54838] transition-colors uppercase">
                      {project.title}
                    </h3>
                  </div>

                  <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[10px] font-code text-white/50">
                    <span className="truncate max-w-[130px]">{project.techStack[0]}</span>
                    <span className="text-white font-bold group-hover:translate-x-1 transition-transform">
                      VIEW →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* CENTRAL NAVIGATION ELEMENT CONTAINING "ME" */}
          <div className="relative z-30 pointer-events-auto">
            {/* Triangular Active Indicator Pointing Toward Active Card */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 pointer-events-none">
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-[#E54838] drop-shadow-md animate-bounce" />
            </div>

            {/* Central Round Element */}
            <button
              onClick={() => {
                soundManager.playModalOpen();
                if (onNavigateAbout) {
                  onNavigateAbout();
                } else {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              aria-label="View Biplov Karki About Me"
              className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-[#111111] border-2 border-[#E54838] shadow-2xl flex items-center justify-center group hover:scale-105 transition-transform"
            >
              {/* Spinning Curved Typography: "PORTFOLIO • PORTFOLIO • PORTFOLIO •" */}
              <svg
                viewBox="0 0 160 160"
                className="absolute inset-0 w-full h-full animate-[spin_18s_linear_infinite] pointer-events-none"
              >
                <path
                  id="circlePath"
                  d="M 80, 80 m -62, 0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
                  fill="none"
                />
                <text className="text-[10.5px] font-bold tracking-[0.24em] uppercase fill-white/80">
                  <textPath href="#circlePath" startOffset="0%">
                    PORTFOLIO • PORTFOLIO • PORTFOLIO •
                  </textPath>
                </text>
              </svg>

              {/* Center "ME" Badge */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                <span className="font-display font-black text-2xl md:text-3xl text-white group-hover:text-[#E54838] transition-colors">
                  ME
                </span>
                <span className="text-[9px] font-code text-[#E54838] tracking-widest uppercase">
                  ABOUT
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* GALLERY CONTROLS & ACTIVE CARD STATUS */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-4 z-10 pt-4 border-t border-[#111111]/15">
        {/* Active Project Info */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-code font-bold bg-[#111111] text-white px-2 py-0.5">
            0{activeIndex + 1} / 0{totalCards}
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-bold font-display uppercase text-[#111111]">
              {activeProject?.title}
            </span>
            <span className="text-xs font-code text-[#777777]">
              {activeProject?.category}
            </span>
          </div>
        </div>

        {/* Carousel Rotation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevCard}
            aria-label="Previous project"
            className="p-3 bg-white border border-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Quick Select Indicators */}
          <div className="flex items-center gap-1.5 px-3">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => rotateTo(i)}
                aria-label={`Jump to project 0${i + 1}`}
                className={`h-1.5 transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-6 bg-[#E54838]'
                    : 'w-2 bg-[#111111]/30 hover:bg-[#111111]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextCard}
            aria-label="Next project"
            className="p-3 bg-white border border-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Deep Dive Action */}
        <button
          onClick={() => {
            if (activeProject) onSelectProject(activeProject);
          }}
          className="text-xs font-bold tracking-wider uppercase text-[#111111] hover:text-[#E54838] transition-colors flex items-center gap-1.5"
        >
          <span>EXPLORE {activeProject?.title}</span>
          <span>→</span>
        </button>
      </div>
    </section>
  );
};
