import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../types/portfolio';
import { PROJECTS } from '../data/portfolioData';
import { ProjectArt } from './ProjectArt';
import { ArrowUpRight, Github, ExternalLink, Terminal } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface ProjectShowcaseProps {
  onSelectProject: (project: Project) => void;
  onCursorEnter?: () => void;
  onCursorLeave?: () => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  onSelectProject,
  onCursorEnter,
  onCursorLeave,
}) => {
  return (
    <section
      id="projects"
      className="relative w-full bg-[#E2E2E2] bg-grain py-24 px-6 md:px-12 border-t border-[#111111]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 bg-[#E54838]" />
          <span className="text-xs font-code font-bold tracking-widest uppercase text-[#777777]">
            SECTION 05 // CURATED ARCHIVE
          </span>
        </div>

        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-black tracking-tight text-[#111111] uppercase">
            SELECTED <span className="text-[#E54838]">WORKS.</span>
          </h2>
          <p className="text-xs md:text-sm font-code text-[#666666] max-w-sm">
            Deep-dive explorations across low-latency systems, algorithmic physics, embedded robotics, and interactive web tools.
          </p>
        </div>

        {/* Alternating Editorial Showcase Cards */}
        <div className="space-y-20">
          {PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center p-6 md:p-10 bg-white border border-[#111111]/15 shadow-xl transition-all duration-300 hover:border-[#111111] ${
                  isEven ? '' : 'lg:grid-flow-dense'
                }`}
              >
                {/* Visual Art Container (7 Cols) */}
                <div
                  className={`w-full aspect-[4/3] md:aspect-[16/10] bg-[#111111] overflow-hidden border border-[#111111]/10 relative group cursor-pointer ${
                    isEven ? 'lg:col-span-7' : 'lg:col-span-7 lg:col-start-6'
                  }`}
                  onClick={() => {
                    soundManager.playModalOpen();
                    onSelectProject(project);
                  }}
                  onMouseEnter={() => {
                    soundManager.playHover();
                    if (onCursorEnter) onCursorEnter();
                  }}
                  onMouseLeave={onCursorLeave}
                >
                  <ProjectArt
                    type={project.visualType}
                    image={project.image}
                    title={project.title}
                    number={project.number}
                    className="w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#E54838]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-[#111111] text-white text-xs font-bold font-code tracking-widest px-4 py-2 uppercase shadow-xl flex items-center gap-2">
                      <span>EXPAND ARCHITECTURE</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Narrative Details (5 Cols) */}
                <div
                  className={`flex flex-col justify-between space-y-6 ${
                    isEven ? 'lg:col-span-5' : 'lg:col-span-5 lg:col-start-1'
                  }`}
                >
                  <div>
                    {/* Metadata Kicker */}
                    <div className="flex items-center gap-2 text-xs font-code text-[#777777] mb-3">
                      <span className="font-bold text-[#E54838]">PROJ {project.number}</span>
                      <span>·</span>
                      <span className="uppercase">{project.category}</span>
                      <span>·</span>
                      <span>{project.year}</span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => {
                        soundManager.playModalOpen();
                        onSelectProject(project);
                      }}
                      className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#111111] uppercase tracking-tight mb-3 hover:text-[#E54838] transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>

                    {/* Tagline / Description */}
                    <p className="text-sm md:text-base font-medium text-[#111111] mb-3">
                      {project.tagline}
                    </p>
                    <p className="text-xs md:text-sm text-[#555555] leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 p-3 bg-[#E2E2E2]/60 border border-[#111111]/10">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-[10px] font-code text-[#777777] uppercase">{m.label}</span>
                        <span className="text-xs md:text-sm font-bold font-code text-[#111111] tabular-nums truncate">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack List */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-code bg-white text-[#111111] px-2.5 py-1 border border-[#111111]/15"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-2">
                    <button
                      onClick={() => {
                        soundManager.playModalOpen();
                        onSelectProject(project);
                      }}
                      onMouseEnter={() => {
                        soundManager.playHover();
                        if (onCursorEnter) onCursorEnter();
                      }}
                      onMouseLeave={onCursorLeave}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] text-white hover:bg-[#E54838] transition-colors text-xs font-bold uppercase tracking-wider"
                    >
                      <span>VIEW PROJECT</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 text-[#111111] hover:text-[#E54838] border border-[#111111]/20 hover:border-[#111111] transition-colors"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
