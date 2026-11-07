// Audio Engine for Royal Digital Wedding Invitation
// Default Background Song: "Kudmayi Reprise (Female Version)"
// Features: High-quality audio stream, fade-in, loop, and graceful procedural synth fallback

type AudioStateListener = (isPlaying: boolean) => void;

class AudioEngine {
  private audio: HTMLAudioElement | null = null;
  private isMusicPlaying: boolean = false;
  private listeners: Set<AudioStateListener> = new Set();

  // Web Audio Context for celebration chimes and procedural fallback
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private synthGain: GainNode | null = null;
  private synthInterval: any = null;
  private useSynthFallback: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.initAudioElement();
    }
  }

  private initAudioElement() {
    if (this.audio) return;
    try {
      this.audio = new Audio("/kudmayi.m4a");
      this.audio.loop = true;
      this.audio.preload = "auto";
      this.audio.volume = 0.8;

      // Fallback to mp3 if m4a format isn't supported
      this.audio.onerror = () => {
        if (this.audio && this.audio.src.endsWith(".m4a")) {
          this.audio.src = "/kudmayi.mp3";
          this.audio.load();
        } else {
          // If media file fails entirely, enable procedural synth fallback
          this.useSynthFallback = true;
          if (this.isMusicPlaying) {
            this.startSynthMusic();
          }
        }
      };

      this.audio.onplay = () => {
        this.isMusicPlaying = true;
        this.notifyListeners();
      };

      this.audio.onpause = () => {
        this.isMusicPlaying = false;
        this.notifyListeners();
      };

      this.audio.onended = () => {
        this.isMusicPlaying = false;
        this.notifyListeners();
      };
    } catch {
      this.useSynthFallback = true;
    }
  }

  private initWebAudio() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        this.synthGain = this.ctx.createGain();
        this.synthGain.gain.setValueAtTime(0.65, this.ctx.currentTime);
        this.synthGain.connect(this.masterGain);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public subscribe(listener: AudioStateListener): () => void {
    this.listeners.add(listener);
    listener(this.isMusicPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.isMusicPlaying));
  }

  public getIsPlaying(): boolean {
    return this.isMusicPlaying;
  }

  public startMusic() {
    this.initAudioElement();
    this.initWebAudio();

    if (!this.useSynthFallback && this.audio) {
      this.audio.volume = 0.05;
      const playPromise = this.audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isMusicPlaying = true;
            this.notifyListeners();

            // Smooth fade in to 0.8 volume over 1.2s
            let vol = 0.05;
            const fadeInInterval = setInterval(() => {
              if (!this.audio || !this.isMusicPlaying) {
                clearInterval(fadeInInterval);
                return;
              }
              vol = Math.min(0.8, vol + 0.08);
              this.audio.volume = vol;
              if (vol >= 0.8) {
                clearInterval(fadeInInterval);
              }
            }, 100);
          })
          .catch(() => {
            // Autoplay policy prevented playback until user interaction, or file issue
            // Fall back to synth if needed
            this.startSynthMusic();
          });
      }
    } else {
      this.startSynthMusic();
    }
  }

  public stopMusic() {
    if (this.audio) {
      this.audio.pause();
    }
    this.stopSynthMusic();
    this.isMusicPlaying = false;
    this.notifyListeners();
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

  // =========================================================================
  // CELEBRATION CHIME (GOLD FOIL REVEAL & SPARKS)
  // =========================================================================
  public playCelebrationChime() {
    this.initWebAudio();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const notes = [587.33, 739.99, 880.0, 1174.66]; // D5, F#5, A5, D6
    notes.forEach((note, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
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

  // =========================================================================
  // PROCEDURAL BACKUP SYNTH (Only used if audio file is unavailable)
  // =========================================================================
  private playPianoNote(freq: number, duration: number, isBass: boolean = false) {
    if (!this.ctx || !this.synthGain || !this.isMusicPlaying) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc1.type = "sine";
    osc2.type = "triangle";

    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 2, now);

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(isBass ? 450 : 1600, now);

    const peakVolume = isBass ? 0.2 : 0.14;

    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(peakVolume, now + 0.03);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.synthGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
  }

  private startSynthMusic() {
    this.initWebAudio();
    if (!this.ctx || !this.synthGain) return;
    this.isMusicPlaying = true;
    this.notifyListeners();

    const melodyPattern: { freq: number; dur: number; isBass?: boolean }[] = [
      { freq: 146.83, dur: 2.2, isBass: true },
      { freq: 293.66, dur: 1.2 },
      { freq: 369.99, dur: 1.2 },
      { freq: 440.0, dur: 1.4 },
      { freq: 587.33, dur: 1.8 },
      { freq: 110.0, dur: 2.2, isBass: true },
      { freq: 277.18, dur: 1.2 },
      { freq: 329.63, dur: 1.2 },
      { freq: 440.0, dur: 1.4 },
      { freq: 554.37, dur: 1.8 },
      { freq: 123.47, dur: 2.2, isBass: true },
      { freq: 293.66, dur: 1.2 },
      { freq: 369.99, dur: 1.2 },
      { freq: 493.88, dur: 1.4 },
      { freq: 587.33, dur: 1.8 },
      { freq: 98.0, dur: 2.2, isBass: true },
      { freq: 293.66, dur: 1.2 },
      { freq: 392.0, dur: 1.2 },
      { freq: 440.0, dur: 1.4 },
      { freq: 493.88, dur: 2.0 },
    ];

    let step = 0;
    const playNextStep = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.synthGain) return;

      const note = melodyPattern[step];
      this.playPianoNote(note.freq, note.dur, !!note.isBass);

      step = (step + 1) % melodyPattern.length;
      const interval = note.isBass ? 650 : 520;
      this.synthInterval = setTimeout(playNextStep, interval);
    };

    playNextStep();
  }

  private stopSynthMusic() {
    if (this.synthInterval) {
      clearTimeout(this.synthInterval);
      this.synthInterval = null;
    }
  }
}

export const audioEngine = new AudioEngine();
