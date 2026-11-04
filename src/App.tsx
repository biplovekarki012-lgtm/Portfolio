/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Project } from './types/portfolio';
import { CustomCursor, CursorMode } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { CircularGallery } from './components/CircularGallery';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { ProjectShowcase } from './components/ProjectShowcase';
import { Contact } from './components/Contact';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ScrollProgress } from './components/ScrollProgress';

export default function App() {
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleCursorHover = () => setCursorMode('hover');
  const handleCursorDefault = () => setCursorMode('default');
  const handleCursorDrag = () => setCursorMode('drag');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#E2E2E2] text-[#111111] overflow-x-hidden selection:bg-[#E54838] selection:text-white">
      {/* Desktop Custom Trailing Cursor */}
      <CustomCursor mode={cursorMode} />

      {/* Fixed 3-Zone Top Bar Navigation */}
      <Navigation
        onCursorEnter={handleCursorHover}
        onCursorLeave={handleCursorDefault}
      />

      {/* Right Edge Vertical Scroll Progress Bar */}
      <ScrollProgress />

      {/* Main Content Sections */}
      <main>
        {/* Section 1: Hero with Layered Experimental PORTFOLIO Typography & Vertical Red Rectangle */}
        <Hero
          onCursorEnter={handleCursorHover}
          onCursorLeave={handleCursorDefault}
          onNavigateGallery={() => scrollToSection('gallery')}
        />

        {/* Section 2: Interactive Circular Fan-Shaped Portfolio Gallery */}
        <CircularGallery
          onSelectProject={(proj) => setSelectedProject(proj)}
          onCursorModeChange={(mode) => setCursorMode(mode)}
          onNavigateAbout={() => scrollToSection('about')}
        />

        {/* Section 3: Behind The Code — About Me */}
        <About
          onCursorEnter={handleCursorHover}
          onCursorLeave={handleCursorDefault}
        />

        {/* Section 4: My Digital Toolkit — Skills & Architecture */}
        <Skills
          onCursorEnter={handleCursorHover}
          onCursorLeave={handleCursorDefault}
        />

        {/* Section 5: Selected Works — Project Showcase Archive */}
        <ProjectShowcase
          onSelectProject={(proj) => setSelectedProject(proj)}
          onCursorEnter={handleCursorHover}
          onCursorLeave={handleCursorDefault}
        />

        {/* Section 6: Contact & Let's Talk */}
        <Contact
          onCursorEnter={handleCursorHover}
          onCursorLeave={handleCursorDefault}
        />
      </main>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
