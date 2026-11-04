import React from 'react';
import { VisualType } from '../types/portfolio';

interface ProjectArtProps {
  type: VisualType;
  image?: string;
  className?: string;
  title?: string;
  number?: string;
}

export const ProjectArt: React.FC<ProjectArtProps> = ({
  type,
  image,
  className = '',
  title = '',
  number = '01'
}) => {
  // If it's the photo card or an image was provided
  if (type === 'photo' && image) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#1a1a1a] select-none ${className}`}>
        <img
          src={image}
          alt={title || "Biplov Karki in Colorado"}
          className="w-full h-full object-cover object-center filter grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        
        {/* Editorial overlay badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="bg-[#E54838] text-white text-[10px] font-bold tracking-widest px-2 py-0.5 uppercase">
            CREATOR
          </span>
          <span className="text-[10px] font-code text-white/80 tracking-widest">
            31°58'N 99°54'W
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-code text-[#E54838] tracking-widest uppercase">TEXAS, USA</p>
            <p className="text-sm font-bold text-white tracking-tight">BIPLOV KARKI</p>
          </div>
          <span className="text-2xl font-display font-extrabold text-white/30">{number}</span>
        </div>
      </div>
    );
  }

  // Render Swiss Editorial SVG graphics according to project discipline
  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#141414] select-none ${className}`}>
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* Type-specific bespoke artwork */}
      {type === 'java' && (
        <div className="relative w-full h-full flex flex-col justify-between p-6">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-code text-[#E54838] tracking-widest uppercase">JVM.L00M // CONCURRENCY</span>
            <span className="text-2xl font-display font-bold text-white/20">{number}</span>
          </div>

          <div className="my-auto relative flex items-center justify-center">
            {/* Orderbook Depth Graphic */}
            <svg viewBox="0 0 240 180" className="w-full h-36">
              <defs>
                <linearGradient id="javaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E54838" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#111111" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {/* Depth stairs */}
              <path d="M 10 160 L 40 160 L 40 140 L 70 140 L 70 110 L 100 110 L 100 80 L 120 80 L 120 170 L 10 170 Z" fill="url(#javaGrad)" />
              <path d="M 120 80 L 140 80 L 140 95 L 170 95 L 170 130 L 200 130 L 200 160 L 230 160 L 230 170 L 120 170 Z" fill="#ffffff" fillOpacity="0.1" />
              <line x1="120" y1="20" x2="120" y2="170" stroke="#E54838" strokeWidth="2" strokeDasharray="3 3" />
              <circle cx="120" cy="80" r="4" fill="#E54838" />
              {/* Floating metrics */}
              <text x="130" y="40" fill="#ffffff" fontSize="9" fontFamily="monospace">1.2M OPS/SEC</text>
              <text x="130" y="55" fill="#E54838" fontSize="8" fontFamily="monospace">SPREAD: 0.0002</text>
            </svg>
          </div>

          <div className="border-t border-white/10 pt-3 flex justify-between items-center text-[10px] font-code text-white/50">
            <span>LOCK-FREE RING</span>
            <span className="text-[#E54838]">120 FPS GUI</span>
          </div>
        </div>
      )}

      {type === 'cpp' && (
        <div className="relative w-full h-full flex flex-col justify-between p-6">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-code text-[#E54838] tracking-widest uppercase">C++20 // RIGID BODY DYNAMICS</span>
            <span className="text-2xl font-display font-bold text-white/20">{number}</span>
          </div>

          <div className="my-auto relative flex items-center justify-center">
            {/* 3D Wireframe Polyhedron & Ray Vector */}
            <svg viewBox="0 0 240 180" className="w-full h-36">
              {/* Wireframe Cube */}
              <polygon points="70,50 150,30 190,60 110,80" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.4" />
              <polygon points="70,130 150,110 190,140 110,160" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.2" />
              <line x1="70" y1="50" x2="70" y2="130" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.3" />
              <line x1="150" y1="30" x2="150" y2="110" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.4" />
              <line x1="190" y1="60" x2="190" y2="140" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.3" />
              <line x1="110" y1="80" x2="110" y2="160" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />
              
              {/* Raytracer bounce vector */}
              <path d="M 20 150 L 110 80 L 180 20 L 220 70" fill="none" stroke="#E54838" strokeWidth="2" />
              <circle cx="110" cy="80" r="5" fill="#E54838" />
              <circle cx="180" cy="20" r="3" fill="#ffffff" />
              
              {/* Normal vectors */}
              <line x1="110" y1="80" x2="110" y2="40" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.7" />
              <text x="30" y="45" fill="#E54838" fontSize="9" fontFamily="monospace">GJK_COLLIDE: TRUE</text>
            </svg>
          </div>

          <div className="border-t border-white/10 pt-3 flex justify-between items-center text-[10px] font-code text-white/50">
            <span>AVX-2 SIMD</span>
            <span className="text-[#E54838]">BVH ACCEL</span>
          </div>
        </div>
      )}

      {type === 'robotics' && (
        <div className="relative w-full h-full flex flex-col justify-between p-6">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-code text-[#E54838] tracking-widest uppercase">
              RPI 4B // PI CRAWLER MINI ROBOT
            </span>
            <span className="text-2xl font-display font-bold text-white/20">{number}</span>
          </div>

          <div className="my-auto relative flex items-center justify-center">
            {/* Pi Crawler Quadruped Kinematics & Dual Code Diagram */}
            <svg viewBox="0 0 240 180" className="w-full h-36">
              {/* Raspberry Pi 4B Mainboard Body */}
              <rect x="80" y="60" width="80" height="55" rx="4" fill="#1b241b" stroke="#4ade80" strokeWidth="1" strokeOpacity="0.4" />
              {/* Pi 4B SoC Chip */}
              <rect x="105" y="75" width="28" height="24" rx="2" fill="#2d3748" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.5" />
              <text x="119" y="89" fill="#4ade80" fontSize="6.5" fontFamily="monospace" textAnchor="middle">BCM2711</text>
              <text x="119" y="96" fill="#ffffff" fontSize="5.5" fontFamily="monospace" textAnchor="middle" opacity="0.6">PI 4B</text>
              
              {/* 40-Pin GPIO Header on edge */}
              <rect x="83" y="62" width="74" height="6" fill="#111111" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.4" />
              
              {/* Front Ultrasonic Sensor 'Eyes' (HC-SR04) */}
              <rect x="98" y="44" width="44" height="16" rx="2" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
              <circle cx="110" cy="52" r="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
              <circle cx="130" cy="52" r="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
              {/* Sound waves emitted */}
              <path d="M 110 38 A 12 12 0 0 1 130 38" fill="none" stroke="#E54838" strokeWidth="1.2" strokeDasharray="2 2" />
              <path d="M 104 32 A 20 20 0 0 1 136 32" fill="none" stroke="#E54838" strokeWidth="1" strokeOpacity="0.6" strokeDasharray="2 2" />

              {/* 4 Articulated Quadruped Crawler Legs */}
              {/* Front Left Leg */}
              <polyline points="80,68 50,50 32,70" fill="none" stroke="#E54838" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="50" cy="50" r="3" fill="#ffffff" />
              <circle cx="32" cy="70" r="2.5" fill="#E54838" />

              {/* Front Right Leg */}
              <polyline points="160,68 190,50 208,70" fill="none" stroke="#E54838" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="190" cy="50" r="3" fill="#ffffff" />
              <circle cx="208" cy="70" r="2.5" fill="#E54838" />

              {/* Rear Left Leg */}
              <polyline points="80,105 52,125 36,110" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
              <circle cx="52" cy="125" r="3" fill="#E54838" />
              <circle cx="36" cy="110" r="2.5" fill="#ffffff" />

              {/* Rear Right Leg */}
              <polyline points="160,105 188,125 204,110" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
              <circle cx="188" cy="125" r="3" fill="#E54838" />
              <circle cx="204" cy="110" r="2.5" fill="#ffffff" />

              {/* Dual Code Callouts: Python & Scratch */}
              <g transform="translate(10, 140)">
                {/* Scratch Block Mock */}
                <rect x="0" y="0" width="95" height="18" rx="3" fill="#ffab19" />
                <circle cx="8" cy="9" r="4" fill="#ffffff" fillOpacity="0.8" />
                <text x="18" y="12" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="sans-serif">SCRATCH: crawl(85)</text>
              </g>

              <g transform="translate(130, 140)">
                {/* Python Terminal Callout */}
                <rect x="0" y="0" width="100" height="18" rx="2" fill="#0f172a" stroke="#3b82f6" strokeWidth="0.8" />
                <text x="6" y="12" fill="#38bdf8" fontSize="7" fontFamily="monospace">py: servo.step()</text>
              </g>
            </svg>
          </div>

          <div className="border-t border-white/10 pt-3 flex justify-between items-center text-[10px] font-code text-white/50">
            <span className="text-[#4ade80]">PYTHON 3 + SCRATCH 3</span>
            <span className="text-[#E54838]">RPI 4B // GAIT KINEMATICS</span>
          </div>
        </div>
      )}

      {type === 'web' && (
        <div className="relative w-full h-full flex flex-col justify-between p-6">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-code text-[#E54838] tracking-widest uppercase">CRDT // REALTIME CANVAS</span>
            <span className="text-2xl font-display font-bold text-white/20">{number}</span>
          </div>

          <div className="my-auto relative flex items-center justify-center">
            {/* Infinite Canvas Wireframe & Multipoint cursor */}
            <svg viewBox="0 0 240 180" className="w-full h-36">
              {/* Canvas viewport boundary */}
              <rect x="30" y="25" width="180" height="120" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
              <rect x="50" y="45" width="60" height="40" fill="#E54838" fillOpacity="0.2" stroke="#E54838" strokeWidth="1.2" />
              <rect x="130" y="60" width="65" height="55" fill="#ffffff" fillOpacity="0.05" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
              
              {/* Connector Bezier curve */}
              <path d="M 110 65 C 120 65, 120 85, 130 85" fill="none" stroke="#E54838" strokeWidth="1.5" strokeDasharray="3 3" />
              
              {/* Collaborative cursors */}
              <polygon points="120,40 132,48 126,50 128,58 124,59 122,51 116,53" fill="#E54838" />
              <text x="135" y="45" fill="#ffffff" fontSize="8" fontFamily="monospace">BK (YOU)</text>
              
              <polygon points="80,110 92,118 86,120 88,128 84,129 82,121 76,123" fill="#ffffff" fillOpacity="0.7" />
              <text x="95" y="115" fill="#ffffff" fontSize="7" fontFamily="monospace" opacity="0.6">PEER_SYNC</text>
            </svg>
          </div>

          <div className="border-t border-white/10 pt-3 flex justify-between items-center text-[10px] font-code text-white/50">
            <span>WEBGL QUAD-TREE</span>
            <span className="text-[#E54838]">18MS LATENCY</span>
          </div>
        </div>
      )}

      {type === 'generative' && (
        <div className="relative w-full h-full flex flex-col justify-between p-6">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-code text-[#E54838] tracking-widest uppercase">GLSL // AUDIO REACTIVE FFT</span>
            <span className="text-2xl font-display font-bold text-white/20">{number}</span>
          </div>

          <div className="my-auto relative flex items-center justify-center">
            {/* Spectral Waveform */}
            <svg viewBox="0 0 240 180" className="w-full h-36">
              {/* Harmonic wave curves */}
              <path d="M 10 90 Q 40 20, 70 90 T 130 90 T 190 90 T 230 90" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
              <path d="M 10 90 Q 45 40, 80 90 T 150 90 T 230 90" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
              <path d="M 10 90 Q 50 160, 90 90 T 170 90 T 230 90" fill="none" stroke="#E54838" strokeWidth="2" />
              
              {/* FFT Bars in background */}
              {[20, 45, 30, 70, 95, 110, 60, 85, 40, 65, 30, 20].map((h, i) => (
                <rect
                  key={i}
                  x={25 + i * 16}
                  y={140 - h * 0.7}
                  width="8"
                  height={h * 0.7}
                  fill={i === 5 || i === 4 ? '#E54838' : '#ffffff'}
                  fillOpacity={i === 5 || i === 4 ? 0.9 : 0.15}
                />
              ))}
              
              <text x="20" y="35" fill="#E54838" fontSize="8" fontFamily="monospace">1024 SPECTRAL BINS</text>
            </svg>
          </div>

          <div className="border-t border-white/10 pt-3 flex justify-between items-center text-[10px] font-code text-white/50">
            <span>SDF RAYMARCH</span>
            <span className="text-[#E54838]">WEB AUDIO</span>
          </div>
        </div>
      )}

      {type === 'distributed' && (
        <div className="relative w-full h-full flex flex-col justify-between p-6">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-code text-[#E54838] tracking-widest uppercase">RAFT // DISTRIBUTED QUEUE</span>
            <span className="text-2xl font-display font-bold text-white/20">{number}</span>
          </div>

          <div className="my-auto relative flex items-center justify-center">
            {/* 5-Node Raft Ring Consensus */}
            <svg viewBox="0 0 240 180" className="w-full h-36">
              {/* Consensus ring connections */}
              <polygon points="120,35 190,75 165,145 75,145 50,75" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
              
              {/* Leader node */}
              <circle cx="120" cy="35" r="14" fill="#E54838" />
              <text x="120" y="38" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace">LDR</text>
              
              {/* Follower nodes */}
              {[
                { x: 190, y: 75, label: 'N2' },
                { x: 165, y: 145, label: 'N3' },
                { x: 75, y: 145, label: 'N4' },
                { x: 50, y: 75, label: 'N5' },
              ].map((node, i) => (
                <g key={i}>
                  <circle cx={node.x} cy={node.y} r="10" fill="#222222" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
                  <text x={node.x} y={node.y + 3} textAnchor="middle" fill="#ffffff" fontSize="7" fontFamily="monospace">{node.label}</text>
                  {/* Heartbeat pulse lines to leader */}
                  <line x1="120" y1="35" x2={node.x} y2={node.y} stroke="#E54838" strokeWidth="1" strokeDasharray="2 3" strokeOpacity="0.6" />
                </g>
              ))}

              <text x="75" y="105" textAnchor="middle" fill="#ffffff" fontSize="8" fontFamily="monospace" opacity="0.6">TERM: 409</text>
            </svg>
          </div>

          <div className="border-t border-white/10 pt-3 flex justify-between items-center text-[10px] font-code text-white/50">
            <span>450K MSG/SEC</span>
            <span className="text-[#E54838]">HA CONSENSUS</span>
          </div>
        </div>
      )}
    </div>
  );
};
