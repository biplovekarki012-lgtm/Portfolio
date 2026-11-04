import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS_DATA } from '../data/portfolioData';
import { SkillItem } from '../types/portfolio';
import { Terminal, Code, Cpu, Play, RotateCcw, Check, Sparkles, SlidersHorizontal, Layers } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface SkillsProps {
  onCursorEnter?: () => void;
  onCursorLeave?: () => void;
}

interface ExecutionLog {
  text: string;
  type: 'info' | 'success' | 'warn' | 'command';
  timestamp: string;
}

export const Skills: React.FC<SkillsProps> = ({ onCursorEnter, onCursorLeave }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(SKILLS_DATA[0]);
  const [copiedCode, setCopiedCode] = useState(false);

  // GSAP animation refs
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const inspectorRef = useRef<HTMLDivElement>(null);
  const libraryTagsRef = useRef<HTMLDivElement>(null);
  const hasInitialScrolledRef = useRef<boolean>(false);

  // Interactive Java Runner States
  const [javaOrderCount, setJavaOrderCount] = useState<number>(10000);
  const [javaSymbol, setJavaSymbol] = useState<string>('NVDA');
  const [javaPrice, setJavaPrice] = useState<number>(195.50);
  const [javaOrderType, setJavaOrderType] = useState<string>('LIMIT_BUY');
  const [javaThreadModel, setJavaThreadModel] = useState<'VIRTUAL' | 'FIXED'>('VIRTUAL');
  
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([
    {
      timestamp: '00:00:00',
      type: 'info',
      text: '[JVM 21.0.2] Ready. Set inputs above and click "RUN CODE" to execute.',
    },
  ]);
  const [lastMetrics, setLastMetrics] = useState<{
    timeMs: string;
    opsPerSec: string;
    throughputPct: string;
  } | null>(null);

  const categories = ['All', 'Languages', 'Web & Frontend', 'Hardware & Systems', 'Tools & DevOps'];

  const filteredSkills = activeCategory === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === activeCategory);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    soundManager.playSnap();
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Run Java Code Simulator with live streamed stdout
  const handleRunJavaCode = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    soundManager.playSnap();
    setLastMetrics(null);

    const getTime = () => new Date().toISOString().substring(11, 19);

    const initialLogs: ExecutionLog[] = [
      {
        timestamp: getTime(),
        type: 'command',
        text: `$ java --enable-preview -XX:+UseZGC OrderbookMatchingEngine.java`,
      },
      {
        timestamp: getTime(),
        type: 'info',
        text: `[JVM 21] Ingesting parameters: symbol=${javaSymbol.toUpperCase()}, price=$${javaPrice.toFixed(2)}, orders=${javaOrderCount.toLocaleString()}, model=${javaThreadModel}_THREADS`,
      },
    ];

    setExecutionLogs(initialLogs);

    // Stream step 1: Thread pool initialization
    setTimeout(() => {
      soundManager.playTick(560, 0.02, 0.03);
      setExecutionLogs((prev) => [
        ...prev,
        {
          timestamp: getTime(),
          type: 'info',
          text: javaThreadModel === 'VIRTUAL'
            ? `[VirtualThreads] Initialized VirtualThreadPerTaskExecutor. Allocating lightweight carriers on ForkJoinPool-1`
            : `[ThreadPool] FixedThreadPool spawned: 16 platform kernel threads with work-stealing queue`,
        },
      ]);
    }, 280);

    // Stream step 2: Order ingestion & RingBuffer
    setTimeout(() => {
      soundManager.playTick(620, 0.02, 0.03);
      const ringBufferKB = Math.round((javaOrderCount * 64) / 1024);
      setExecutionLogs((prev) => [
        ...prev,
        {
          timestamp: getTime(),
          type: 'info',
          text: `[DisruptorRing] Allocated ${ringBufferKB} KB zero-copy memory ring buffer at 0x7FFF9420`,
        },
        {
          timestamp: getTime(),
          type: 'info',
          text: `[OrderBook] Ingesting ${javaOrderCount.toLocaleString()} ${javaOrderType} orders for ${javaSymbol.toUpperCase()}...`,
        },
      ]);
    }, 650);

    // Stream step 3: Execution results & completion
    setTimeout(() => {
      soundManager.playTick(740, 0.04, 0.05);
      const executionTime = javaThreadModel === 'VIRTUAL'
        ? (Math.random() * 3 + (javaOrderCount > 25000 ? 12.4 : 7.2)).toFixed(2)
        : (Math.random() * 8 + (javaOrderCount > 25000 ? 38.6 : 22.8)).toFixed(2);

      const opsPerSec = Math.round((javaOrderCount / (parseFloat(executionTime) / 1000))).toLocaleString();

      setExecutionLogs((prev) => [
        ...prev,
        {
          timestamp: getTime(),
          type: 'success',
          text: `[MatchEngine] Completed matching ${javaOrderCount.toLocaleString()} orders in ${executionTime} ms!`,
        },
        {
          timestamp: getTime(),
          type: 'success',
          text: `[Metrics] Throughput: ${opsPerSec} orders/sec | ZGC Pause: 0.14 ms | Fill Rate: 100%`,
        },
        {
          timestamp: getTime(),
          type: 'command',
          text: `Process finished with exit code 0 (SUCCESS)`,
        },
      ]);

      setLastMetrics({
        timeMs: `${executionTime} ms`,
        opsPerSec: `${opsPerSec} ops/s`,
        throughputPct: '100% FILLED',
      });

      setIsExecuting(false);
    }, 1150);
  };

  const handleClearOutput = () => {
    soundManager.playSnap();
    setExecutionLogs([
      {
        timestamp: '00:00:00',
        type: 'info',
        text: '[Terminal cleared. Click "RUN CODE" to test again.]',
      },
    ]);
    setLastMetrics(null);
  };

  // GSAP ScrollTrigger Entrance Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Section Header & Heading Float Entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 2. Category Filter Tabs Staggered Float
      const tabBtns = tabsRef.current?.querySelectorAll('.category-tab-btn');
      if (tabBtns && tabBtns.length > 0) {
        gsap.fromTo(
          tabBtns,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: tabsRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }

      // 3. Skill Cards Staggered Floating Entrance
      const skillCards = cardsGridRef.current?.querySelectorAll('.skill-tag-card');
      if (skillCards && skillCards.length > 0) {
        gsap.fromTo(
          skillCards,
          {
            opacity: 0,
            y: 48,
            scale: 0.94,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: {
              amount: 0.5,
              from: 'start',
              ease: 'power2.out',
            },
            ease: 'power4.out',
            clearProps: 'transform,scale',
            onComplete: () => {
              hasInitialScrolledRef.current = true;
            },
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      // 4. Inspector Column Entrance
      if (inspectorRef.current) {
        gsap.fromTo(
          inspectorRef.current,
          { opacity: 0, y: 40, x: 20 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.9,
            ease: 'power4.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: inspectorRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Staggered Float Entrance when switching active category
  useEffect(() => {
    if (!hasInitialScrolledRef.current || !cardsGridRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = cardsGridRef.current.querySelectorAll('.skill-tag-card');
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 28,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: 'power3.out',
          clearProps: 'transform,scale',
        }
      );
    }
  }, [activeCategory]);

  // Micro-stagger animation for Inspector's Tech Stack tags on skill change
  useEffect(() => {
    if (!libraryTagsRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tags = libraryTagsRef.current.querySelectorAll('.skill-library-tag');
    if (tags.length > 0) {
      gsap.fromTo(
        tags,
        { opacity: 0, y: 12, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          stagger: 0.035,
          ease: 'back.out(1.5)',
          clearProps: 'transform,scale',
        }
      );
    }
  }, [selectedSkill]);

  // Dynamically constructed Java code matching user inputs
  const dynamicJavaCode = `// Java 21 High-Throughput Matching Engine
final String symbol = "${javaSymbol.toUpperCase()}";
final double targetPrice = ${javaPrice.toFixed(2)};
final int orderCount = ${javaOrderCount};

try (var executor = Executors.${
    javaThreadModel === 'VIRTUAL'
      ? 'newVirtualThreadPerTaskExecutor()'
      : 'newFixedThreadPool(Runtime.getRuntime().availableProcessors())'
  }) {
    IntStream.range(0, orderCount).forEach(i -> {
        executor.submit(() -> {
            Order order = new Order(symbol, targetPrice, OrderType.${javaOrderType});
            orderBook.matchOrder(order);
        });
    });
}`;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full bg-[#E2E2E2] bg-grain py-24 px-6 md:px-12 border-t border-[#111111]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef}>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 bg-[#E54838]" />
            <span className="text-xs font-code font-bold tracking-widest uppercase text-[#777777]">
              SECTION 04 // CAPABILITIES & ARCHITECTURE
            </span>
          </div>

          {/* Heading: MY DIGITAL TOOLKIT. */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-black tracking-tight text-[#111111] uppercase">
              MY DIGITAL <span className="text-[#E54838]">TOOLKIT.</span>
            </h2>

            <p className="text-xs md:text-sm font-code text-[#666666] max-w-xs">
              Interactive architecture inspector. Select a skill to inspect its technical stack, ecosystem tags, and run code directly in the browser.
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          ref={tabsRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10 border-b border-[#111111]/15"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundManager.playTick(500, 0.02, 0.04);
                setActiveCategory(cat);
              }}
              onMouseEnter={() => {
                soundManager.playHover();
                if (onCursorEnter) onCursorEnter();
              }}
              onMouseLeave={onCursorLeave}
              className={`category-tab-btn px-4 py-2 text-xs font-bold font-code tracking-wider uppercase transition-all whitespace-nowrap shrink-0 border cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white/60 text-[#111111] border-[#111111]/15 hover:border-[#111111] hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2-Column Split: Skill Cards Grid + Live Inspector & Interactive Runner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (6 Cols): Interactive Skill Cards */}
          <div
            ref={cardsGridRef}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5"
          >
            {filteredSkills.map((skill, idx) => {
              const isSelected = selectedSkill.name === skill.name;
              return (
                <div
                  key={skill.name}
                  onClick={() => {
                    soundManager.playSnap();
                    setSelectedSkill(skill);
                  }}
                  onMouseEnter={() => {
                    soundManager.playHover();
                    if (onCursorEnter) onCursorEnter();
                  }}
                  onMouseLeave={() => {
                    if (onCursorLeave) onCursorLeave();
                  }}
                  className={`skill-tag-card p-5 text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-[#111111] text-white border-[#111111] shadow-lg -translate-y-1'
                      : 'bg-white hover:bg-white/95 text-[#111111] border-[#111111]/15 hover:border-[#111111] hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className={`text-[10px] font-code font-bold uppercase tracking-wider ${
                        isSelected ? 'text-[#E54838]' : 'text-[#777777]'
                      }`}
                    >
                      0{idx + 1} // {skill.category}
                    </span>
                    <div
                      className={`w-2 h-2 rounded-full transition-transform group-hover:scale-125 ${
                        isSelected ? 'bg-[#E54838]' : 'bg-[#111111]/20'
                      }`}
                    />
                  </div>

                  <div>
                    <h3 className="font-display font-extrabold text-xl md:text-2xl uppercase tracking-tight mb-2">
                      {skill.name}
                    </h3>
                    <p
                      className={`text-xs line-clamp-2 leading-relaxed mb-3 ${
                        isSelected ? 'text-white/70' : 'text-[#555555]'
                      }`}
                    >
                      {skill.description}
                    </p>

                    {/* Skill Tags / Library Badges */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {skill.libraries.slice(0, 3).map((lib) => (
                        <span
                          key={lib}
                          className={`text-[9px] font-code px-1.5 py-0.5 tracking-wider uppercase border transition-colors ${
                            isSelected
                              ? 'bg-white/10 text-white/90 border-white/20'
                              : 'bg-[#F2F2F2] text-[#444444] border-[#111111]/10 group-hover:border-[#111111]/25'
                          }`}
                        >
                          {lib}
                        </span>
                      ))}
                      {skill.libraries.length > 3 && (
                        <span
                          className={`text-[8px] font-code px-1 py-0.5 self-center ${
                            isSelected ? 'text-white/40' : 'text-[#888888]'
                          }`}
                        >
                          +{skill.libraries.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 pt-3 border-t border-current/10 flex items-center justify-between text-[11px] font-code">
                    <span className="truncate max-w-[130px] opacity-75">{skill.libraries[0]}</span>
                    <span className="font-bold flex items-center gap-1">
                      {isSelected ? 'ACTIVE ‹' : 'INSPECT →'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column (6 Cols): Inspector & Live Code Runner */}
          <div
            ref={inspectorRef}
            className="lg:col-span-6 bg-[#141414] text-white p-6 md:p-8 border border-[#111111] shadow-2xl sticky top-24"
          >
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-[#E54838]" />
                <span className="text-[11px] font-code text-white/80 uppercase tracking-widest">
                  INSPECTOR // {selectedSkill.name}
                </span>
                {selectedSkill.name === 'Java' && (
                  <span className="bg-[#E54838] text-white text-[9px] font-bold font-code px-1.5 py-0.2 uppercase">
                    INTERACTIVE RUNNER
                  </span>
                )}
              </div>
              <button
                onClick={() => handleCopy(selectedSkill.name === 'Java' ? dynamicJavaCode : selectedSkill.codeSnippet)}
                className="text-[10px] font-code text-[#E54838] hover:text-white transition-colors flex items-center gap-1 bg-white/5 px-2 py-1 cursor-pointer"
              >
                {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Terminal className="w-3 h-3" />}
                <span>{copiedCode ? 'COPIED' : 'COPY CODE'}</span>
              </button>
            </div>

            {/* Selected Skill Details */}
            <div className="mb-4">
              <div className="text-[10px] font-code text-[#E54838] uppercase tracking-widest mb-1">
                {selectedSkill.experience}
              </div>
              <h3 className="text-xl md:text-2xl font-display font-extrabold uppercase text-white mb-2">
                {selectedSkill.name}
              </h3>
              <p className="text-xs text-white/80 leading-relaxed mb-3">
                {selectedSkill.description}
              </p>
            </div>

            {/* Tech Stack & Framework Tags */}
            <div className="mb-5 p-3.5 bg-white/5 border border-white/10" ref={libraryTagsRef}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-code text-white/60 uppercase tracking-widest flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-[#E54838]" /> TECH STACK & ECOSYSTEM TAGS
                </span>
                <span className="text-[9px] font-code text-white/40">
                  {selectedSkill.libraries.length} COMPONENTS
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedSkill.libraries.map((lib) => (
                  <span
                    key={lib}
                    className="skill-library-tag text-xs font-code px-2.5 py-1 bg-white/10 text-[#E2E2E2] border border-white/20 hover:border-[#E54838] hover:text-white transition-colors cursor-default"
                  >
                    {lib}
                  </span>
                ))}
              </div>
            </div>

            {/* If Java is selected: Interactive Input Controls Panel */}
            {selectedSkill.name === 'Java' && (
              <div className="mb-6 p-4 bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[11px] font-code font-bold text-[#E54838] flex items-center gap-1.5 uppercase">
                    <SlidersHorizontal className="w-3.5 h-3.5" /> USER SIMULATION INPUTS
                  </span>
                  <span className="text-[10px] font-code text-white/40">CONFIGURABLE</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-code">
                  {/* Input 1: Order Count */}
                  <div>
                    <label className="block text-[10px] text-white/60 uppercase mb-1">
                      ORDER COUNT (N)
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min={100}
                        max={100000}
                        step={1000}
                        value={javaOrderCount}
                        onChange={(e) => setJavaOrderCount(Math.max(10, parseInt(e.target.value) || 100))}
                        className="w-full bg-black/60 border border-white/20 px-2.5 py-1.5 text-white font-code text-xs focus:outline-none focus:border-[#E54838]"
                      />
                      <button
                        onClick={() => setJavaOrderCount(50000)}
                        className="text-[9px] bg-white/10 hover:bg-white/20 text-white px-2 py-1.5 shrink-0"
                        title="Set 50k high volume"
                      >
                        50K
                      </button>
                    </div>
                  </div>

                  {/* Input 2: Asset Symbol */}
                  <div>
                    <label className="block text-[10px] text-white/60 uppercase mb-1">
                      TICKER SYMBOL
                    </label>
                    <input
                      type="text"
                      maxLength={8}
                      value={javaSymbol}
                      onChange={(e) => setJavaSymbol(e.target.value.toUpperCase())}
                      placeholder="e.g. NVDA"
                      className="w-full bg-black/60 border border-white/20 px-2.5 py-1.5 text-white font-code text-xs focus:outline-none focus:border-[#E54838]"
                    />
                  </div>

                  {/* Input 3: Target Base Price */}
                  <div>
                    <label className="block text-[10px] text-white/60 uppercase mb-1">
                      BASE PRICE ($)
                    </label>
                    <input
                      type="number"
                      step={0.5}
                      value={javaPrice}
                      onChange={(e) => setJavaPrice(parseFloat(e.target.value) || 100)}
                      className="w-full bg-black/60 border border-white/20 px-2.5 py-1.5 text-white font-code text-xs focus:outline-none focus:border-[#E54838]"
                    />
                  </div>

                  {/* Input 4: Thread Model */}
                  <div>
                    <label className="block text-[10px] text-white/60 uppercase mb-1">
                      CONCURRENCY MODEL
                    </label>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setJavaThreadModel('VIRTUAL')}
                        className={`flex-1 py-1.5 text-[10px] font-bold border transition-colors cursor-pointer ${
                          javaThreadModel === 'VIRTUAL'
                            ? 'bg-[#E54838] text-white border-[#E54838]'
                            : 'bg-black/40 text-white/60 border-white/15 hover:text-white'
                        }`}
                      >
                        VIRTUAL (LOOM)
                      </button>
                      <button
                        onClick={() => setJavaThreadModel('FIXED')}
                        className={`flex-1 py-1.5 text-[10px] font-bold border transition-colors cursor-pointer ${
                          javaThreadModel === 'FIXED'
                            ? 'bg-[#E54838] text-white border-[#E54838]'
                            : 'bg-black/40 text-white/60 border-white/15 hover:text-white'
                        }`}
                      >
                        FIXED POOL
                      </button>
                    </div>
                  </div>
                </div>

                {/* RUN BUTTON */}
                <div className="pt-1 flex items-center gap-3">
                  <button
                    onClick={handleRunJavaCode}
                    disabled={isExecuting}
                    className={`flex-1 py-2.5 px-4 text-xs font-bold font-code uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isExecuting
                        ? 'bg-[#E54838]/70 text-white cursor-wait animate-pulse'
                        : 'bg-[#E54838] hover:bg-white text-white hover:text-[#111111] shadow-lg'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isExecuting ? 'COMPILING & EXECUTING...' : 'RUN JAVA CODE (EXECUTE)'}</span>
                  </button>

                  <button
                    onClick={handleClearOutput}
                    className="p-2.5 bg-white/10 hover:bg-white/20 text-white text-xs transition-colors cursor-pointer"
                    title="Reset & clear terminal"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Code Snippet Container */}
            <div className="mb-5">
              <span className="text-[10px] font-code text-white/50 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                <Code className="w-3 h-3 text-[#E54838]" />{' '}
                {selectedSkill.name === 'Java' ? 'SOURCE CODE (UPDATED WITH YOUR INPUTS)' : 'SAMPLE IMPLEMENTATION'}
              </span>
              <div className="p-3.5 bg-black/70 border border-white/10 overflow-x-auto no-scrollbar font-code text-xs leading-relaxed text-[#E2E2E2] max-h-44">
                <pre>
                  <code>{selectedSkill.name === 'Java' ? dynamicJavaCode : selectedSkill.codeSnippet}</code>
                </pre>
              </div>
            </div>

            {/* OUTPUT SECTION: Interactive Console Terminal */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-code text-white/50 uppercase tracking-widest flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-emerald-400" /> CONSOLE OUTPUT / STDOUT
                </span>
                {lastMetrics && (
                  <div className="flex items-center gap-2 text-[10px] font-code text-[#4ade80]">
                    <span>⏱ {lastMetrics.timeMs}</span>
                    <span>⚡ {lastMetrics.opsPerSec}</span>
                  </div>
                )}
              </div>

              {/* Terminal Screen */}
              <div className="p-3 bg-black/90 border border-white/15 font-code text-xs leading-relaxed min-h-[140px] max-h-[180px] overflow-y-auto space-y-1 rounded-none shadow-inner">
                {executionLogs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-white/30 text-[10px] select-none shrink-0">{log.timestamp}</span>
                    <span
                      className={`break-all ${
                        log.type === 'command'
                          ? 'text-[#38bdf8] font-bold'
                          : log.type === 'success'
                          ? 'text-[#4ade80] font-semibold'
                          : log.type === 'warn'
                          ? 'text-amber-400'
                          : 'text-[#E2E2E2]'
                      }`}
                    >
                      {log.text}
                    </span>
                  </div>
                ))}
                {isExecuting && (
                  <div className="flex items-center gap-2 text-[#E54838] animate-pulse">
                    <span className="w-2 h-3 bg-[#E54838] inline-block animate-[ping_0.8s_ease-in-out_infinite]" />
                    <span className="text-xs">Processing concurrency pipeline...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
