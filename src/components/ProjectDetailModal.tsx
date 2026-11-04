import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Terminal, Cpu, Layers } from 'lucide-react';
import { Project } from '../types/portfolio';
import { ProjectArt } from './ProjectArt';
import { soundManager } from '../utils/sound';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (project) {
      soundManager.playModalOpen();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-[#E2E2E2] text-[#111111] overflow-hidden rounded-none shadow-2xl flex flex-col md:flex-row border border-[#111111]"
          >
            {/* Left Column: Visual Artwork */}
            <div className="w-full md:w-5/12 min-h-[260px] md:min-h-full bg-[#111111] relative">
              <ProjectArt
                type={project.visualType}
                image={project.image}
                title={project.title}
                number={project.number}
                className="w-full h-full"
              />
            </div>

            {/* Right Column: Editorial Details */}
            <div className="w-full md:w-7/12 p-6 md:p-10 overflow-y-auto max-h-[60vh] md:max-h-[85vh]">
              {/* Top Bar with Number & Close */}
              <div className="flex items-center justify-between border-b border-[#111111]/15 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-code font-bold bg-[#E54838] text-white px-2 py-0.5">
                    PROJECT {project.number}
                  </span>
                  <span className="text-xs font-code text-[#777777] uppercase tracking-wider">
                    {project.category} · {project.year}
                  </span>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-[#111111] hover:text-[#E54838] hover:bg-black/5 transition-colors rounded-none"
                  aria-label="Close project modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-2xl md:text-4xl font-display font-extrabold tracking-tight uppercase text-[#111111] mb-2">
                {project.title}
              </h2>
              <p className="text-sm md:text-base font-medium text-[#E54838] mb-6">
                {project.tagline}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-white border border-[#111111]/10 mb-6">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-[11px] font-code text-[#777777] uppercase tracking-wider">{m.label}</span>
                    <span className="text-base md:text-lg font-bold font-code text-[#111111] tabular-nums">{m.value}</span>
                  </div>
                ))}
              </div>

              {/* Narrative Description */}
              <div className="space-y-4 mb-6 text-sm md:text-base leading-relaxed text-[#222222]">
                <p>{project.longDescription}</p>
              </div>

              {/* Architectural Highlights */}
              <div className="mb-6">
                <h4 className="text-xs font-bold tracking-widest uppercase text-[#111111] mb-3 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-[#E54838]" /> Key Technical Architecture
                </h4>
                <ul className="space-y-2 text-xs md:text-sm text-[#333333]">
                  {project.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#E54838] font-bold">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <h4 className="text-xs font-bold tracking-widest uppercase text-[#111111] mb-3 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#E54838]" /> Technologies & Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-code bg-white text-[#111111] border border-[#111111]/15"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-[#111111]/15">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-white hover:bg-[#E54838] transition-colors text-xs font-bold uppercase tracking-wider"
                  >
                    <Github className="w-4 h-4" /> View Source
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-white text-[#111111] border border-[#111111] hover:bg-black/5 transition-colors text-xs font-bold uppercase tracking-wider"
                >
                  Close Window
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
