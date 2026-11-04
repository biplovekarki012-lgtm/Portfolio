import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Mail, Github, Linkedin, FileText, Send, CheckCircle2, ArrowUpRight, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

interface ContactProps {
  onCursorEnter?: () => void;
  onCursorLeave?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onCursorEnter, onCursorLeave }) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  // Magnetic button physics
  const magneticRef = useRef<HTMLButtonElement>(null);
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const smoothBtnX = useSpring(btnX, springConfig);
  const smoothBtnY = useSpring(btnY, springConfig);

  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magneticRef.current) return;
    const rect = magneticRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    btnX.set(distanceX * 0.35);
    btnY.set(distanceY * 0.35);
  };

  const handleMagneticLeave = () => {
    btnX.set(0);
    btnY.set(0);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    soundManager.playSnap();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playModalOpen();
    setIsSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#E54838', '#111111', '#ffffff']
    });
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#111111] text-[#E2E2E2] py-24 px-6 md:px-12 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2.5 h-2.5 bg-[#E54838]" />
          <span className="text-xs font-code font-bold tracking-widest uppercase text-white/50">
            SECTION 06 // COLLABORATION & INQUIRY
          </span>
        </div>

        {/* Headline: LET'S CREATE SOMETHING EXTRAORDINARY. */}
        <div className="mb-14 select-none w-full max-w-full overflow-hidden">
          <h2 className="font-display font-black uppercase leading-[0.98] text-white">
            <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              LET'S CREATE
            </span>
            <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-outline-white hover:text-white transition-colors duration-300 tracking-tight my-1">
              SOMETHING
            </span>
            <span className="block text-xl sm:text-3xl md:text-4xl lg:text-[4.6vw] xl:text-[4.2vw] text-[#E54838] tracking-[-0.03em] whitespace-nowrap mt-1">
              EXTRAORDINARY.
            </span>
          </h2>
        </div>

        {/* 2-Column Layout: Direct Connect & Quick Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-20 border-b border-white/10">
          {/* Left Column (5 Cols): Personal Info & Links */}
          <div className="lg:col-span-5 space-y-8">
            <p className="text-base md:text-lg text-white/80 leading-relaxed font-body">
              Whether you are looking for a dedicated software developer, an ambitious collaborator on
              low-latency systems or robotics, or discussing opportunities — my inbox is always open.
            </p>

            {/* Direct Email Card */}
            <div className="p-6 bg-white/5 border border-white/10 flex flex-col gap-3">
              <span className="text-xs font-code text-white/50 uppercase tracking-wider">DIRECT EMAIL</span>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-base sm:text-lg font-bold font-code text-white hover:text-[#E54838] transition-colors truncate"
                >
                  {PERSONAL_INFO.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 bg-white/10 hover:bg-[#E54838] text-white transition-colors shrink-0"
                  aria-label="Copy email address"
                  title="Copy email"
                >
                  {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Social & Professional Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white transition-colors flex items-center justify-between text-xs font-bold font-code uppercase tracking-wider text-white"
              >
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-[#E54838]" />
                  <span>GITHUB</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white transition-colors flex items-center justify-between text-xs font-bold font-code uppercase tracking-wider text-white"
              >
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-[#E54838]" />
                  <span>LINKEDIN</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
              </a>

              <button
                onClick={() => {
                  soundManager.playModalOpen();
                  setShowResumeModal(true);
                }}
                className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white transition-colors flex items-center justify-between text-xs font-bold font-code uppercase tracking-wider text-white text-left"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#E54838]" />
                  <span>RESUME</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
              </button>
            </div>
          </div>

          {/* Right Column (7 Cols): Interactive Quick Message Form */}
          <div className="lg:col-span-7 bg-[#161616] p-8 md:p-10 border border-white/10 shadow-2xl">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#E54838] mx-auto animate-bounce" />
                <h3 className="text-2xl font-display font-extrabold text-white uppercase">
                  MESSAGE DISPATCHED!
                </h3>
                <p className="text-sm text-white/70 max-w-md mx-auto">
                  Thank you for reaching out, {formState.name || 'friend'}. I'll get back to you promptly at {formState.email}.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormState({ name: '', email: '', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 bg-white text-[#111111] hover:bg-[#E54838] hover:text-white transition-colors text-xs font-bold uppercase tracking-wider"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6">
                  <span className="text-xs font-code font-bold text-[#E54838]">QUICK INQUIRY</span>
                  <span className="text-[11px] font-code text-white/40">RESPONSE WITHIN 24H</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-code text-white/60 uppercase mb-2">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alex Jensen"
                      className="w-full bg-white/5 border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E54838] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-code text-white/60 uppercase mb-2">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full bg-white/5 border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E54838] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-code text-white/60 uppercase mb-2">
                    PROJECT INQUIRY / MESSAGE *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project, timeline, or open role..."
                    className="w-full bg-white/5 border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E54838] transition-colors resize-none"
                  />
                </div>

                {/* MAGNETIC "LET'S TALK" SUBMIT BUTTON */}
                <div className="pt-2">
                  <motion.button
                    ref={magneticRef}
                    style={{ x: smoothBtnX, y: smoothBtnY }}
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                    type="submit"
                    onMouseEnter={() => {
                      soundManager.playHover();
                      if (onCursorEnter) onCursorEnter();
                    }}
                    className="w-full py-4 bg-[#E54838] hover:bg-white text-white hover:text-[#111111] transition-colors text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl group cursor-pointer"
                  >
                    <span>LET'S TALK</span>
                    <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-code text-white/40">
          <p>© 2026 BIPLOV KARKI — DESIGNED & DEVELOPED WITH CREATIVITY.</p>
          <div className="flex items-center gap-4">
            <span>COLORADO, USA</span>
            <span>·</span>
            <a href="#hero" className="hover:text-white transition-colors">
              BACK TO TOP ↑
            </a>
          </div>
        </div>
      </div>

      {/* Resume Viewer Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setShowResumeModal(false)}
          />
          <div className="relative z-10 w-full max-w-2xl bg-[#E2E2E2] text-[#111111] p-6 md:p-8 border border-[#111111] shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#111111]/15 pb-4 mb-6">
              <div>
                <span className="text-xs font-code font-bold bg-[#E54838] text-white px-2 py-0.5">
                  CURRICULUM VITAE
                </span>
                <h3 className="text-2xl font-display font-extrabold uppercase text-[#111111] mt-1">
                  BIPLOV KARKI
                </h3>
              </div>
              <button
                onClick={() => setShowResumeModal(false)}
                className="p-2 text-[#111111] hover:text-[#E54838]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-code text-[#222222]">
              <div className="p-4 bg-white border border-[#111111]/10">
                <p className="font-bold text-sm text-[#111111] mb-1">EDUCATION</p>
                <p>B.S. in Computer Science</p>
                <p className="text-[#777777]">Focus: Systems Software, Distributed Architectures & Robotics</p>
              </div>

              <div className="p-4 bg-white border border-[#111111]/10">
                <p className="font-bold text-sm text-[#111111] mb-1">TECHNICAL EXPERTISE</p>
                <p>Languages: Java 21, Modern C++20, TypeScript, Python, SQL</p>
                <p>Systems & Web: Docker, ROS2, Linux Kernel / GPIO, React, Tailwind CSS, WebGL</p>
              </div>

              <div className="p-4 bg-white border border-[#111111]/10">
                <p className="font-bold text-sm text-[#111111] mb-1">STATUS</p>
                <p className="text-[#E54838] font-bold">Open to Software Engineering & Creative Tech Roles</p>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Resume%20Inquiry%20-%20Biplov%20Karki`}
                  className="px-5 py-2.5 bg-[#111111] text-white hover:bg-[#E54838] transition-colors text-xs font-bold uppercase tracking-wider"
                >
                  Request Official PDF Copy
                </a>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="px-4 py-2 border border-[#111111] text-xs font-bold uppercase"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
