class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientLfo: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private listeners: Set<(enabled: boolean) => void> = new Set();
  private lastHoverTime: number = 0;
  private lastDragSoundTime: number = 0;

  constructor() {
    // Starts disabled until user toggles
  }

  public subscribe(fn: (enabled: boolean) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.enabled));
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    this.initCtx();

    if (this.enabled) {
      this.startAmbient();
      this.playSnap();
    } else {
      this.stopAmbient();
    }

    this.notify();
    return this.enabled;
  }

  public setEnabled(val: boolean) {
    if (this.enabled === val) return;
    this.enabled = val;
    this.initCtx();

    if (this.enabled) {
      this.startAmbient();
      this.playSnap();
    } else {
      this.stopAmbient();
    }

    this.notify();
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /* ----------------- AMBIENT ATMOSPHERE DRONE ----------------- */
  private startAmbient() {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ambientGain) return; // Already running

      const now = this.ctx.currentTime;

      // Master ambient gain node with smooth fade-in
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.015, now + 2.5); // Whisper quiet warm bed

      // Low-pass filter for velvety warmth
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260, now);
      filter.Q.setValueAtTime(1.8, now);

      // Fundamental warm sine: A2 (110Hz)
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(110, now);

      // Harmonious fifth: E3 (164.81Hz)
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(164.81, now);

      // Ultra-slow LFO to create breathing texture
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.12, now); // ~8 second gentle breathing cycle
      lfoGain.gain.setValueAtTime(1.5, now);
      lfo.connect(osc1.frequency);

      // Route
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();
      lfo.start();

      this.ambientOsc1 = osc1;
      this.ambientOsc2 = osc2;
      this.ambientLfo = lfo;
      this.ambientGain = masterGain;
    } catch {
      // AudioContext fallback
    }
  }

  private stopAmbient() {
    if (!this.ambientGain || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

      setTimeout(() => {
        try {
          this.ambientOsc1?.stop();
          this.ambientOsc2?.stop();
          this.ambientLfo?.stop();
          this.ambientOsc1?.disconnect();
          this.ambientOsc2?.disconnect();
          this.ambientLfo?.disconnect();
          this.ambientGain?.disconnect();
        } catch {
          // ignore
        }
        this.ambientOsc1 = null;
        this.ambientOsc2 = null;
        this.ambientLfo = null;
        this.ambientGain = null;
      }, 900);
    } catch {
      this.ambientGain = null;
    }
  }

  /* ----------------- HIGH-FIDELITY UI INTERACTION SOUNDS ----------------- */

  /** Soft microscopic wooden tap when hovering interactive elements (throttled to avoid buzz) */
  public playHover() {
    if (!this.enabled) return;
    const now = performance.now();
    if (now - this.lastHoverTime < 50) return; // 50ms throttle
    this.lastHoverTime = now;

    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(840, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.02);

      gain.gain.setValueAtTime(0.022, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.02);
    } catch {
      // ignore
    }
  }

  /** Crisp magnetic snap on button clicks / toggles */
  public playSnap() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;

      // High click transient
      const click = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();
      click.type = 'triangle';
      click.frequency.setValueAtTime(1100, t);
      click.frequency.exponentialRampToValueAtTime(220, t + 0.035);

      clickGain.gain.setValueAtTime(0.06, t);
      clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

      click.connect(clickGain);
      clickGain.connect(this.ctx.destination);

      click.start(t);
      click.stop(t + 0.035);

      // Low tactile body
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(160, t);
      sub.frequency.exponentialRampToValueAtTime(50, t + 0.05);

      subGain.gain.setValueAtTime(0.04, t);
      subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

      sub.connect(subGain);
      subGain.connect(this.ctx.destination);

      sub.start(t);
      sub.stop(t + 0.05);
    } catch {
      // ignore
    }
  }

  /**
   * Smooth, velvety sound for carousel dragging.
   * Produces a warm, rounded analog glide tone with lowpass filtering and a gentle envelope.
   * Paced with a ~180ms throttle so dragging sounds calm and smooth, never rapid or frantic.
   */
  public playSmoothDrag(velocity = 0) {
    if (!this.enabled) return;
    const now = performance.now();
    // Pace the audio: throttle to at most once per 180ms to prevent rapid chattering
    if (now - this.lastDragSoundTime < 180) return;
    this.lastDragSoundTime = now;

    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      // Soft warm tone: warm sine oscillator starting around 195Hz and gliding down smoothly to 135Hz
      osc.type = 'sine';
      const speedOffset = Math.min(Math.abs(velocity) * 3, 30);
      const startFreq = 195 + speedOffset;
      const endFreq = 135;
      osc.frequency.setValueAtTime(startFreq, t);
      osc.frequency.exponentialRampToValueAtTime(endFreq, t + 0.13);

      // Lowpass filter to ensure complete absence of harsh clicks or edges
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(340, t);
      filter.frequency.exponentialRampToValueAtTime(200, t + 0.13);
      filter.Q.value = 1.0;

      // Smooth rounded volume envelope: soft 20ms attack ramp, gentle 110ms decay
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.022, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.13);
    } catch {
      // ignore
    }
  }

  /** Soft mechanical tick when rotating carousel */
  public playTick(freq = 520, duration = 0.025, vol = 0.04) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.4, t + duration);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(vol, t + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + duration);
    } catch {
      // ignore
    }
  }

  /** Air whoosh card swipe */
  public playCardFlip() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(380, t + 0.04);
      osc.frequency.exponentialRampToValueAtTime(130, t + 0.1);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(420, t);
      filter.frequency.exponentialRampToValueAtTime(220, t + 0.1);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.028, t + 0.018);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.1);
    } catch {
      // ignore
    }
  }

  /** Ethereal chime when opening detailed modal */
  public playModalOpen() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;

      // Dual harmonic sine
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, t); // C5
      osc1.frequency.exponentialRampToValueAtTime(1046.5, t + 0.16); // C6

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, t); // E5
      osc2.frequency.exponentialRampToValueAtTime(1318.5, t + 0.16); // E6

      gain.gain.setValueAtTime(0.035, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.28);
      osc2.stop(t + 0.28);
    } catch {
      // ignore
    }
  }

  /** Soft resolving tone when closing modal */
  public playModalClose() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, t);
      osc.frequency.exponentialRampToValueAtTime(330, t + 0.14);

      gain.gain.setValueAtTime(0.03, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.18);
    } catch {
      // ignore
    }
  }
}

export const soundManager = new SoundManager();
