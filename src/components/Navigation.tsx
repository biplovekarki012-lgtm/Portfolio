import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface NavigationProps {
  onCursorEnter?: () => void;
  onCursorLeave?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onCursorEnter, onCursorLeave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(!soundManager.isEnabled());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const enabled = soundManager.toggle();
    setIsMuted(!enabled);
  };

  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'GALLERY', href: '#gallery' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    soundManager.playSnap();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Fixed Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#E2E2E2]/90 backdrop-blur-md border-b border-[#111111]/10 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          {/* Brand Wordmark */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            onMouseEnter={onCursorEnter}
            onMouseLeave={onCursorLeave}
            className="flex items-center gap-2 group whitespace-nowrap shrink-0"
          >
            <div className="w-2.5 h-2.5 bg-[#E54838] transition-transform duration-300 group-hover:scale-125" />
            <span className="font-display font-extrabold text-sm md:text-base tracking-wider uppercase text-[#111111]">
              BIPLOV KARKI
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold tracking-widest text-[#111111]/80">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                onMouseEnter={() => {
                  soundManager.playHover();
                  if (onCursorEnter) onCursorEnter();
                }}
                onMouseLeave={onCursorLeave}
                className="hover:text-[#E54838] transition-colors whitespace-nowrap relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#E54838] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: Sound Toggle + Menu Button */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Ambient Sound Toggle with Dynamic Equalizer Bars */}
            <button
              onClick={toggleSound}
              onMouseEnter={() => {
                soundManager.playHover();
                if (onCursorEnter) onCursorEnter();
              }}
              onMouseLeave={onCursorLeave}
              aria-label={isMuted ? 'Turn ambient sound ON' : 'Turn ambient sound OFF'}
              className={`px-3 py-1.5 border transition-all flex items-center gap-2 text-[11px] font-code cursor-pointer ${
                isMuted
                  ? 'border-[#111111]/20 bg-white/50 text-[#777777] hover:border-[#111111] hover:text-[#111111]'
                  : 'border-[#E54838] bg-[#111111] text-white shadow-md'
              }`}
              title={isMuted ? 'Ambient sound: OFF (Click to enable)' : 'Ambient sound: PLAYING (Click to mute)'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#777777]" />
                  <span className="hidden sm:inline font-bold">AMBIENT OFF</span>
                </>
              ) : (
                <>
                  {/* Dancing Equalizer Bars */}
                  <div className="flex items-end gap-0.5 h-3.5 w-3.5 py-0.5" aria-hidden="true">
                    <span className="w-0.5 bg-[#E54838] h-full animate-[pulse_0.8s_ease-in-out_infinite]" />
                    <span className="w-0.5 bg-white h-2/3 animate-[pulse_0.5s_ease-in-out_infinite_0.2s]" />
                    <span className="w-0.5 bg-[#E54838] h-5/6 animate-[pulse_0.7s_ease-in-out_infinite_0.1s]" />
                    <span className="w-0.5 bg-white h-1/2 animate-[pulse_0.6s_ease-in-out_infinite_0.3s]" />
                  </div>
                  <span className="hidden sm:inline font-bold text-[#E54838]">AMBIENT ON</span>
                </>
              )}
            </button>

            {/* Resume / Connect Action on Desktop */}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              onMouseEnter={() => {
                soundManager.playHover();
                if (onCursorEnter) onCursorEnter();
              }}
              onMouseLeave={onCursorLeave}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#111111] text-white hover:bg-[#E54838] transition-colors text-xs font-bold tracking-wider uppercase whitespace-nowrap shrink-0"
            >
              LET'S TALK
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile / Fullscreen Menu Toggle */}
            <button
              onClick={() => {
                soundManager.playSnap();
                setIsOpen(!isOpen);
              }}
              onMouseEnter={onCursorEnter}
              onMouseLeave={onCursorLeave}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 bg-[#111111] text-white hover:bg-[#E54838] transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 bg-[#111111] text-[#E2E2E2] flex flex-col justify-between p-8 md:p-16 lg:hidden"
          >
            {/* Top brand */}
            <div className="flex justify-between items-center border-b border-white/10 pb-6 pt-16">
              <span className="font-display font-extrabold text-lg text-[#E54838]">
                BIPLOV KARKI
              </span>
              <span className="text-xs font-code text-white/50">NAVIGATION</span>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-5 my-auto">
              {navLinks.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="group flex items-center justify-between text-3xl md:text-5xl font-display font-extrabold text-white/80 hover:text-white hover:translate-x-3 transition-all"
                >
                  <span className="group-hover:text-[#E54838] transition-colors">
                    {link.label}
                  </span>
                  <span className="text-xs font-code text-white/30 group-hover:text-[#E54838]">
                    0{idx + 1}
                  </span>
                </a>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 pt-6 flex justify-between items-center text-xs font-code text-white/50">
              <span>TEXAS, USA</span>
              <span className="text-[#E54838]">COMPUTER SCIENCE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
