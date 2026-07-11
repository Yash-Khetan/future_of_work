// Audio engine disabled / removed
class NoOpAudioEngine {
  constructor() {
    this.enabled = false;
    this.musicPlaying = false;
  }

  autoStart() {}
  toggle() { return false; }
  startMusic() {}
  stopMusic() {}
  playClick() {}
  playSelect() {}
  playCollapse() {}
  playTransition() {}
  playAlert() {}
}

export const audio = new NoOpAudioEngine();
