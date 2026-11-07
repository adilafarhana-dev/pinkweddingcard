// Pure Audio Engine for Royal Digital Wedding Invitation
// Dedicated solely to playing "Kudmayi Reprise (Female)" without any extra sounds, chimes, or synth

type AudioStateListener = (isPlaying: boolean) => void;

class AudioEngine {
  private audio: HTMLAudioElement | null = null;
  private isMusicPlaying: boolean = false;
  private listeners: Set<AudioStateListener> = new Set();

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
      this.audio.volume = 0.85;

      // Fallback to mp3 if m4a format isn't supported by browser
      this.audio.onerror = () => {
        if (this.audio && this.audio.src.endsWith(".m4a")) {
          this.audio.src = "/kudmayi.mp3";
          this.audio.load();
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
    } catch (e) {
      console.warn("Audio initialization:", e);
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

    if (this.audio) {
      this.audio.volume = 0.15;
      const playPromise = this.audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isMusicPlaying = true;
            this.notifyListeners();

            // Smooth gentle volume fade-in to 0.85
            let vol = 0.15;
            const fadeIn = setInterval(() => {
              if (!this.audio || !this.isMusicPlaying) {
                clearInterval(fadeIn);
                return;
              }
              vol = Math.min(0.85, vol + 0.08);
              this.audio.volume = vol;
              if (vol >= 0.85) {
                clearInterval(fadeIn);
              }
            }, 100);
          })
          .catch((err) => {
            console.log("Audio play awaiting user gesture:", err);
          });
      }
    }
  }

  public stopMusic() {
    if (this.audio) {
      this.audio.pause();
    }
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

  // Celebration chime is completely silenced so only Kudmayi plays
  public playCelebrationChime() {
    // Intentionally silent: keeping only Kudmayi music with zero extra sounds
  }
}

export const audioEngine = new AudioEngine();
