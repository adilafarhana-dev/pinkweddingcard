// Simple, Peaceful & Elegant Wedding Piano / Harp Melody
// Clean, soft acoustic tones with zero harshness, pure and soothing

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMusicPlaying: boolean = false;
  private musicInterval: any = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
        this.musicGain.connect(this.masterGain);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playCelebrationChime() {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const notes = [587.33, 739.99, 880.00, 1174.66]; // D5, F#5, A5, D6
    notes.forEach((note, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, now + idx * 0.1);

      gain.gain.setValueAtTime(0.001, now + idx * 0.1);
      gain.gain.linearRampToValueAtTime(0.09, now + idx * 0.1 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 1.6);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 1.7);
    });
  }

  public toggleMusic(): boolean {
    if (this.isMusicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isMusicPlaying;
  }

  // =========================================================================
  // SIMPLE, SWEET & PEACEFUL ACOUSTIC PIANO / HARP CHORD ARPEGGIO
  // =========================================================================
  private playPianoNote(freq: number, duration: number, isBass: boolean = false) {
    if (!this.ctx || !this.musicGain || !this.isMusicPlaying) return;

    const now = this.ctx.currentTime;

    // Pure warm sine + gentle soft triangle blend for natural acoustic tone
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 2, now); // Gentle warm harmonic

    // Soft low-pass filter to ensure smooth, mellow sound with zero harshness
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isBass ? 450 : 1600, now);

    const peakVolume = isBass ? 0.22 : 0.16;

    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(peakVolume, now + 0.03);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.musicGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
  }

  public startMusic() {
    this.init();
    if (!this.ctx || !this.musicGain) return;
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;

    // Simple, timeless romantic progression (D major - A major - B minor - G major)
    // Peaceful, gentle, slow tempo (approx 58 BPM)
    const melodyPattern: { freq: number; dur: number; isBass?: boolean }[] = [
      // 1. D Major (Soft & Pure)
      { freq: 146.83, dur: 2.2, isBass: true }, // D3 Bass
      { freq: 293.66, dur: 1.2 },               // D4
      { freq: 369.99, dur: 1.2 },               // F#4
      { freq: 440.00, dur: 1.4 },               // A4
      { freq: 587.33, dur: 1.8 },               // D5

      // 2. A Major (Warm & Sweet)
      { freq: 110.00, dur: 2.2, isBass: true }, // A2 Bass
      { freq: 277.18, dur: 1.2 },               // C#4
      { freq: 329.63, dur: 1.2 },               // E4
      { freq: 440.00, dur: 1.4 },               // A4
      { freq: 554.37, dur: 1.8 },               // C#5

      // 3. B Minor (Gentle & Emotional)
      { freq: 123.47, dur: 2.2, isBass: true }, // B2 Bass
      { freq: 293.66, dur: 1.2 },               // D4
      { freq: 369.99, dur: 1.2 },               // F#4
      { freq: 493.88, dur: 1.4 },               // B4
      { freq: 587.33, dur: 1.8 },               // D5

      // 4. G Major (Peaceful Resolution)
      { freq: 98.00, dur: 2.2, isBass: true },  // G2 Bass
      { freq: 293.66, dur: 1.2 },               // D4
      { freq: 392.00, dur: 1.2 },               // G4
      { freq: 440.00, dur: 1.4 },               // A4
      { freq: 493.88, dur: 2.0 },               // B4
    ];

    let step = 0;

    const playNextStep = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.musicGain) return;

      const note = melodyPattern[step];
      this.playPianoNote(note.freq, note.dur, !!note.isBass);

      step = (step + 1) % melodyPattern.length;
      // Stagger notes softly every 550ms for a peaceful flowing harp/piano rhythm
      const interval = note.isBass ? 650 : 520;
      this.musicInterval = setTimeout(playNextStep, interval);
    };

    playNextStep();
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearTimeout(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const audioEngine = new AudioEngine();
