import { Project, SkillItem } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'BIPLOV KARKI',
  firstName: 'BIPLOV',
  lastName: 'KARKI',
  role: 'Software Developer & Creative Technologist',
  subtitles: [
    'Computer Science Student',
    'Software Developer',
    'Creative Technologist',
    'Aspiring Full-Stack Developer'
  ],
  bioIntro: "Hi, I'm Biplov Karki, a Computer Science student passionate about building meaningful digital experiences. I enjoy exploring the intersection of software development, technology, design, and creativity.",
  tagline: 'CREATING DIGITAL EXPERIENCES THROUGH CODE, CREATIVITY & INNOVATION.',
  email: 'biplovekarki012@gmail.com',
  github: 'https://github.com/biplovkarki',
  linkedin: 'https://linkedin.com/in/biplovkarki',
  location: 'Texas, USA',
  photoUrl: './assets/aistudio/me_colorado_b7ee2f80.jpg',
  status: 'Open to Software Engineering & Creative Tech Roles',
  academicBio: {
    degree: 'B.S. in Computer Science',
    focus: 'Systems Software, Algorithms, Full-Stack Architecture & Robotics',
    philosophy: 'Code is not just an instruction set for silicon; it is a canvas for human imagination. I believe the highest caliber software unites mathematical precision with visceral, intuitive design.',
    interests: ['High-Performance Computing', 'Interactive Graphics', 'Distributed Architectures', 'Embedded IoT & Robotics', 'Typography & Visual Systems']
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'pi-crawler-robot',
    number: '01',
    title: 'Pi Crawler Mini Robot',
    category: 'Raspberry Pi Robotics',
    year: '2025',
    tagline: 'Quadruped crawling robot built with Raspberry Pi 4B, programmed in Python & Scratch.',
    description: 'An autonomous multi-legged mini robot engineered with a Raspberry Pi 4B, featuring servo-driven gait kinematics, ultrasonic distance sensing, and dual-mode control stacks in Python and Scratch.',
    longDescription: 'The Pi Crawler Mini Robot is an articulated quadruped robotics project constructed around a Raspberry Pi 4B microcomputer. Biplov engineered the locomotion gait algorithms by coordinating multi-axis micro-servos through an I2C PWM controller board. The system features two interoperable programming layers: an interactive event-driven Scratch block environment for rapid visual testing of crawling maneuvers and gestures, and a Python control script for direct GPIO communication, HC-SR04 ultrasonic distance polling, and autonomous obstacle navigation routines.',
    techStack: ['Raspberry Pi 4B', 'Python 3', 'Scratch 3', 'I2C / GPIO', 'PWM Servo Driver', 'Ultrasonic HC-SR04', 'Kinematics'],
    visualType: 'robotics',
    metrics: [
      { label: 'Compute Core', value: 'Raspberry Pi 4B' },
      { label: 'Control Stack', value: 'Python & Scratch' },
      { label: 'Locomotion', value: '8-Axis Quadruped' }
    ],
    highlights: [
      'Engineered 8-DOF quadruped inverse kinematics for forward crawl, reverse, and spot-turning',
      'Developed Scratch visual block routines for rapid gesture sequencing and interactive trigger events',
      'Wrote modular Python GPIO controller with interrupt-driven ultrasonic obstacle avoidance',
      'Calibrated PCA9685 16-channel 12-bit PWM servo driver over hardware I2C bus'
    ],
    githubUrl: 'https://github.com/biplovkarki/pi-crawler-mini-robot',
    liveDemoUrl: '#'
  },
  {
    id: 'aurafx-trading',
    number: '02',
    title: 'AuraFX Trading Visualizer',
    category: 'Java Applications',
    year: '2025',
    tagline: 'Concurrent orderbook simulation and real-time market depth analyzer in Java 21.',
    description: 'A low-latency financial market simulator in modern Java utilizing virtual threads and lock-free ring buffers for multi-asset matching.',
    longDescription: 'AuraFX demonstrates low-latency system principles within the JVM. It implements an orderbook with double-ended red-black trees and atomic pointer updates. Coupled with a modern JavaFX rendering loop running at locked 120 FPS, the visualizer maps bid/ask liquidity mountains, order execution slippage, and volatility clusters in real time.',
    techStack: ['Java 21', 'Virtual Threads (Project Loom)', 'JavaFX', 'Lock-Free Queues', 'Disruptor Pattern'],
    visualType: 'java',
    metrics: [
      { label: 'Match Rate', value: '1.2M matches/s' },
      { label: 'Frame Pacing', value: '120 FPS' },
      { label: 'GC Pause', value: '< 200µs (ZGC)' }
    ],
    highlights: [
      'Architected lock-free circular buffer utilizing Java 21 Memory Segments',
      'Simulated concurrent institutional market makers with geometric Brownian motion',
      'Interactive depth chart visualizer with instant liquidity shock stress-testing'
    ],
    githubUrl: 'https://github.com/biplovkarki/aurafx-matching-engine',
    liveDemoUrl: '#'
  },
  {
    id: 'chronos-physics',
    number: '03',
    title: 'Chronos C++20 Physics & Raytracer',
    category: 'C++ Projects',
    year: '2025',
    tagline: 'Real-time rigid body dynamics engine and SIMD-accelerated path tracer.',
    description: 'High-performance C++20 simulation environment combining impulse-based 3D collision mechanics with an AVX-2 accelerated Monte Carlo path tracer.',
    longDescription: 'Built from scratch without external graphics or physics libraries, Chronos compiles clean C++20 with template metaprogramming for maximum inlining and zero runtime overhead. Features include GJK/EPA convex hull collision detection, sequential impulse solvers for non-penetration constraints, and a parallel bounding volume hierarchy (BVH) ray accelerator.',
    techStack: ['C++20', 'SIMD / AVX2', 'OpenGL / WebGL', 'Linear Algebra', 'CMake', 'GLSL'],
    visualType: 'cpp',
    metrics: [
      { label: 'Active Rigid Bodies', value: '10,000+' },
      { label: 'Ray Bounces', value: '8 Bounces' },
      { label: 'BVH Traversal', value: 'O(log N)' }
    ],
    highlights: [
      'Impulse-based constraint solver with friction cone compliance',
      'Surface Area Heuristic (SAH) spatial partitioning tree for ray intersections',
      'Interactive camera manipulation with real-time dielectric glass refractions'
    ],
    githubUrl: 'https://github.com/biplovkarki/chronos-cpp-physics-engine',
    liveDemoUrl: '#'
  },
  {
    id: 'aetheria-platform',
    number: '04',
    title: 'Aetheria Collaborative Canvas',
    category: 'Web Development',
    year: '2026',
    tagline: 'Real-time infinite workspace with conflict-free replicated data types.',
    description: 'An ultra-responsive collaborative design workspace featuring WebGL hardware acceleration, infinite canvas zooming, and peer-to-peer state syncing.',
    longDescription: 'Aetheria is an experimental digital canvas engineered for creative teams to think and prototype together without friction. Built with modern TypeScript, React, and custom WebGL shaders, it handles thousands of vector nodes on screen while keeping peer-to-peer synchronization completely conflict-free through Yjs CRDTs.',
    techStack: ['TypeScript', 'React', 'Tailwind CSS', 'CRDTs (Yjs)', 'WebGL', 'WebSockets'],
    visualType: 'web',
    metrics: [
      { label: 'Canvas Nodes', value: '25,000+' },
      { label: 'Sync Latency', value: '18ms' },
      { label: 'Lighthouse Score', value: '100 / 100' }
    ],
    highlights: [
      'Quad-tree spatial culling for buttery-smooth 60fps pan and zoom',
      'Distributed undo/redo stack using vector clocks',
      'Export support for clean SVG, PNG, and production-ready React code components'
    ],
    githubUrl: 'https://github.com/biplovkarki/aetheria-collaborative-canvas',
    liveDemoUrl: '#'
  },
  {
    id: 'biplov-spotlight',
    number: '05',
    title: 'Biplov Karki — Behind The Code',
    category: 'Software Development',
    year: '2026',
    tagline: 'Computer Science student, software developer, and creative technologist.',
    description: 'Based in Texas, USA, blending mathematical rigor with cutting-edge visual experiences across systems software, full-stack, and robotics.',
    longDescription: 'Curiosity driven developer with a strong foundation in algorithmic problem solving, software engineering paradigms, and creative digital interfaces. Dedicated to architecting robust systems that are as elegant underneath the hood as they appear on the surface.',
    techStack: ['Computer Science', 'Systems Architecture', 'UI/UX Craft', 'Open Source', 'Creative Coding'],
    visualType: 'photo',
    image: '/assets/aistudio/me_colorado_b7ee2f80.jpg',
    metrics: [
      { label: 'Academic Focus', value: 'CompSci Major' },
      { label: 'Primary Languages', value: 'Java, C++, TS' },
      { label: 'Location', value: 'Texas, USA' }
    ],
    highlights: [
      'Passionate about high-performance computing, systems engineering, and low-latency code',
      'Experienced in building end-to-end full stack web platforms and hardware robotics integrations',
      'Always looking for ambitious software engineering challenges and collaborative innovation'
    ],
    githubUrl: 'https://github.com/biplovkarki',
    liveDemoUrl: '#'
  }
];

export const SKILLS_DATA: SkillItem[] = [
  {
    name: 'Java',
    category: 'Languages',
    experience: 'Advanced / Academic & Production Systems',
    description: 'Core object-oriented design, multithreading, concurrent data structures, Project Loom virtual threads, JVM internals, and JavaFX.',
    libraries: ['Java 21', 'Spring Boot', 'JavaFX', 'JUnit 5', 'Disruptor'],
    codeSnippet: `// Concurrent worker utilizing Java 21 virtual threads
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 10_000).forEach(i -> {
        executor.submit(() -> orderBook.matchOrder(incomingOrders.poll()));
    });
}`
  },
  {
    name: 'C++',
    category: 'Languages',
    experience: 'Intermediate-Advanced / Systems & Graphics',
    description: 'Modern C++20 features: concepts, ranges, smart pointers, RAII, memory management, low-level optimization, and SIMD intrinsics.',
    libraries: ['C++20', 'STL', 'CMake', 'OpenGL', 'GLM'],
    codeSnippet: `// Template concept constraint & SIMD vector dot product
template <typename T>
concept Vector3D = requires(T v) { { v.x } -> std::floating_point; };

inline float Dot(const auto& a, const auto& b) noexcept {
    return _mm_cvtss_f32(_mm_dp_ps(a.simd, b.simd, 0x71));
}`
  },
  {
    name: 'React & Next.js',
    category: 'Web & Frontend',
    experience: 'Advanced / Full-Stack & UI Architecture',
    description: 'Modern component-driven frontend architecture, hooks, server state management, motion primitives, and high-performance WebGL integrations.',
    libraries: ['React 19', 'Next.js', 'Motion', 'Tailwind CSS', 'Zustand'],
    codeSnippet: `const { scrollYProgress } = useScroll({ target: heroRef });
const yText = useTransform(scrollYProgress, [0, 1], [0, -120]);
const opacityOut = useTransform(scrollYProgress, [0, 0.4], [1, 0]);`
  },
  {
    name: 'TypeScript & JavaScript',
    category: 'Languages',
    experience: 'Advanced / Type Safety & Engine Building',
    description: 'Strong static typing, generics, discriminated unions, asynchronous programming, Web Workers, and Web Audio API synthesis.',
    libraries: ['TypeScript 5.x', 'ESNext', 'Node.js', 'Vite', 'Express'],
    codeSnippet: `type MatrixAction<T extends string, P> = {
  readonly type: T;
  readonly payload: P;
  readonly timestamp: number;
};`
  },
  {
    name: 'Python',
    category: 'Languages',
    experience: 'Proficient / Robotics, Scripting & Algorithms',
    description: 'Hardware control scripts, micro-servo PWM coordination, sensor data processing, algorithmic modeling, and robotics automation.',
    libraries: ['Python 3', 'RPi.GPIO', 'smbus2 (I2C)', 'NumPy', 'PCA9685 Driver'],
    codeSnippet: `# Pi Crawler gait control: 8-DOF quadruped stride
def execute_crawl_stride(front_servos, rear_servos, angle=45):
    pca9685.set_pwm_angle(front_servos['left'], 90 + angle)
    pca9685.set_pwm_angle(rear_servos['right'], 90 - angle)
    time.sleep(0.08)
    pca9685.set_pwm_angle(front_servos['left'], 90)`
  },
  {
    name: 'Raspberry Pi & Robotics',
    category: 'Hardware & Systems',
    experience: 'Hands-on / Raspberry Pi 4B & Pi Crawler',
    description: 'Embedded Linux microcomputing on Raspberry Pi 4B, 8-channel PWM micro-servo gait control, I2C bus communications, and Scratch visual block integration.',
    libraries: ['Raspberry Pi 4B', 'Scratch 3', 'Python GPIO', 'PCA9685 PWM', 'HC-SR04 Ultrasonic'],
    codeSnippet: `// Scratch 3 & Python hardware bridge for Pi Crawler
// 1. Scratch block: [when flag clicked] -> [broadcast 'crawl_forward']
// 2. Python listener triggers I2C servo bus:
bus.write_i2c_block_data(PCA9685_ADDR, LED0_ON_L, [0x00, 0x00, 0x99, 0x01])`
  },
  {
    name: 'HTML & Modern CSS',
    category: 'Web & Frontend',
    experience: 'Mastery / Swiss Design & Typography',
    description: 'Semantic markup, CSS Grid & Flexbox mathematical layouts, Swiss editorial typography, variable fonts, and hardware-accelerated animations.',
    libraries: ['Tailwind CSS v4', 'CSS Grid', 'Custom Properties', 'SVG Filters'],
    codeSnippet: `.swiss-hero-text {
  text-transform: uppercase;
  letter-spacing: -0.04em;
  -webkit-text-stroke: 1.5px currentColor;
}`
  },
  {
    name: 'Git & GitHub',
    category: 'Tools & DevOps',
    experience: 'Advanced / Version Control & CI/CD',
    description: 'Collaborative Git branching workflows, rebase strategies, semantic versioning, GitHub Actions CI/CD automation, and open-source contributions.',
    libraries: ['Git CLI', 'GitHub Actions', 'Docker', 'Linux / Bash'],
    codeSnippet: `git checkout -b feature/distributed-raft-consensus
git commit -m "feat(raft): implement leader heartbeats and term election"
git push origin feature/distributed-raft-consensus`
  },
  {
    name: 'Problem Solving & Algorithms',
    category: 'Hardware & Systems',
    experience: 'Academic & Competitive CS Focus',
    description: 'Deep understanding of algorithmic paradigms: Graph algorithms (Dijkstra, A*), dynamic programming, divide-and-conquer, computational geometry, and Big-O spatial/temporal complexity analysis.',
    libraries: ['Data Structures', 'Graph Theory', 'Dynamic Programming', 'Complexity Theory'],
    codeSnippet: `// Asymptotic guarantee: O((V + E) log V) shortest path
priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
dist[start] = 0; pq.push({0, start});`
  }
];
