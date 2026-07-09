// Audio engine with generative ambient background music
class AudioEngine {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
    this.musicPlaying = false;
    this.musicNodes = [];
    this.musicGain = null;
    this.arpeggioTimer = null;
  }

  _ensureCtx() {
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      return true;
    } catch {
      return false;
    }
  }

  // Try to start music immediately; if browser blocks it, start on first interaction
  autoStart() {
    if (this._ensureCtx() && this.audioCtx.state === 'running') {
      this.startMusic();
    } else {
      const start = () => {
        this.startMusic();
        window.removeEventListener('click', start);
        window.removeEventListener('touchstart', start);
        window.removeEventListener('keydown', start);
      };
      window.addEventListener('click', start, { once: true });
      window.addEventListener('touchstart', start, { once: true });
      window.addEventListener('keydown', start, { once: true });
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.startMusic();
    } else {
      this.stopMusic();
    }
    return this.enabled;
  }

  // ── Background Music ──────────────────────────────────────────────
  startMusic() {
    if (this.musicPlaying || !this._ensureCtx()) return;
    this.musicPlaying = true;

    // Master gain for all music
    this.musicGain = this.audioCtx.createGain();
    this.musicGain.gain.setValueAtTime(0, this.audioCtx.currentTime);
    this.musicGain.gain.linearRampToValueAtTime(0.03, this.audioCtx.currentTime + 4);
    this.musicGain.connect(this.audioCtx.destination);

    // Warm lowpass filter — higher cutoff for a brighter, lighter feel
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, this.audioCtx.currentTime);
    filter.Q.setValueAtTime(0.7, this.audioCtx.currentTime);
    filter.connect(this.musicGain);

    // Gentle LFO for subtle movement
    const lfo = this.audioCtx.createOscillator();
    const lfoGain = this.audioCtx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.05, this.audioCtx.currentTime);
    lfoGain.gain.setValueAtTime(200, this.audioCtx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    this.musicNodes.push(lfo);

    // Bright C major pad — C, E, G with gentle detuning for warmth
    const padNotes = [
      { freq: 65.4,  detune:  0  },   // C2
      { freq: 65.4,  detune:  5  },   // C2 slightly detuned
      { freq: 82.4,  detune: -3 },    // E2
      { freq: 98.0,  detune:  4  },   // G2
      { freq: 130.8, detune:  0  },   // C3
      { freq: 164.8, detune: -4 },    // E3
    ];

    padNotes.forEach(({ freq, detune }) => {
      const osc = this.audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      osc.detune.setValueAtTime(detune, this.audioCtx.currentTime);
      osc.connect(filter);
      osc.start();
      this.musicNodes.push(osc);
    });

    // Light shimmer layer
    [261.6, 392.0].forEach((freq) => {
      const osc = this.audioCtx.createOscillator();
      const g = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      g.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      osc.connect(g);
      g.connect(filter);
      osc.start();
      this.musicNodes.push(osc);
    });

    // Gentle arpeggiator
    this._scheduleArpeggio();
  }

  _scheduleArpeggio() {
    if (!this.musicPlaying || !this.enabled) return;

    // C major pentatonic — bright and relaxed
    const notes = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];
    const note = notes[Math.floor(Math.random() * notes.length)];

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(note, this.audioCtx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2500, this.audioCtx.currentTime);

    const now = this.audioCtx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.018, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    osc.start(now);
    osc.stop(now + 2.0);

    // Schedule next note at a relaxed interval (2–5 seconds)
    const nextDelay = 2000 + Math.random() * 3000;
    this.arpeggioTimer = setTimeout(() => this._scheduleArpeggio(), nextDelay);
  }

  stopMusic() {
    this.musicPlaying = false;
    if (this.arpeggioTimer) {
      clearTimeout(this.arpeggioTimer);
      this.arpeggioTimer = null;
    }
    if (this.musicGain) {
      const now = this.audioCtx.currentTime;
      this.musicGain.gain.linearRampToValueAtTime(0, now + 0.5);
      setTimeout(() => {
        this.musicNodes.forEach((node) => {
          try { node.stop(); } catch {}
        });
        this.musicNodes = [];
        this.musicGain = null;
      }, 600);
    }
  }

  // ── Sound Effects ─────────────────────────────────────────────────
  playClick() {
    if (!this.enabled || !this._ensureCtx()) return;
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.audioCtx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.1);

    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.1);
  }

  playSelect() {
    if (!this.enabled || !this._ensureCtx()) return;
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.audioCtx.currentTime + 0.15);

    gainNode.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.15);

    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.15);
  }

  playCollapse() {
    if (!this.enabled || !this._ensureCtx()) return;
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.audioCtx.currentTime + 0.12);

    gainNode.gain.setValueAtTime(0.06, this.audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.12);

    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.12);
  }

  playTransition() {
    if (!this.enabled || !this._ensureCtx()) return;
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.audioCtx.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.25);

    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.25);
  }

  playAlert() {
    if (!this.enabled || !this._ensureCtx()) return;
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, this.audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(150, this.audioCtx.currentTime + 0.3);

    gainNode.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.3);

    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.3);
  }
}

export const audio = new AudioEngine();
