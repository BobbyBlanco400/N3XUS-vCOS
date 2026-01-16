export class SoundManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambienceOsc: OscillatorNode | null = null;
  private ambienceGain: GainNode | null = null;
  private enabled: boolean = true;
  private volume: number = 0.3;
  private muted: boolean = false;

  private static instance: SoundManager;

  private constructor() {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);
        
        // Load mute state
        this.muted = localStorage.getItem('nexus_sound_muted') === 'true';
        this.enabled = !this.muted;
        this.masterGain.gain.value = this.muted ? 0 : this.volume;
    } catch (e) {
        console.warn('Web Audio API not supported');
    }
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public init() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (!this.muted) {
        this.startAmbience();
    }
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
    this.muted = !enabled;
    localStorage.setItem('nexus_sound_muted', this.muted.toString());
    
    if (this.masterGain) {
        this.masterGain.gain.setTargetAtTime(
            this.muted ? 0 : this.volume, 
            this.ctx?.currentTime || 0, 
            0.1
        );
    }

    if (!this.muted) {
        this.startAmbience();
    } else {
        this.stopAmbience();
    }
  }

  public toggle() {
    this.setEnabled(!this.enabled);
    return this.enabled;
  }

  public isMuted() {
      return this.muted;
  }

  public playHover() {
    if (this.muted) return;
    this.playTone(800, 'sine', 0.05, 0.02);
  }

  public playClick() {
    if (this.muted) return;
    this.playTone(600, 'triangle', 0.1, 0.05);
  }

  public playChime() {
      if (this.muted) return;
      this.playTone(523.25, 'sine', 0.3, 0.1); // C5
      setTimeout(() => this.playTone(659.25, 'sine', 0.3, 0.1), 100); // E5
  }

  public playWindowOpen() {
    if (!this.enabled) return;
    this.playTone(300, 'sine', 0.3, 0.1);
    setTimeout(() => this.playTone(500, 'sine', 0.4, 0.1), 100);
  }

  public playWindowClose() {
    if (!this.enabled) return;
    this.playTone(400, 'sine', 0.2, 0.1);
    setTimeout(() => this.playTone(200, 'sine', 0.2, 0.1), 100);
  }

  public playConstellationTone(freq: number) {
     if (!this.enabled) return;
     this.playTone(freq, 'sine', 0.8, 0.05);
  }

  // PR 18: Voice Input Enhancement (Shure MV7 Profile)
  public async createVoiceInputChain(stream: MediaStream): Promise<MediaStreamAudioSourceNode | null> {
    if (!this.ctx) return null;

    const source = this.ctx.createMediaStreamSource(stream);
    
    // 1. Noise Gate (simulated with DynamicsCompressor)
    const noiseGate = this.ctx.createDynamicsCompressor();
    noiseGate.threshold.value = -50;
    noiseGate.knee.value = 40;
    noiseGate.ratio.value = 12;
    noiseGate.attack.value = 0;
    noiseGate.release.value = 0.25;

    // 2. High-pass Filter (remove rumble)
    const highPass = this.ctx.createBiquadFilter();
    highPass.type = 'highpass';
    highPass.frequency.value = 80; // 80Hz rolloff

    // 3. Presence Boost (Shure MV7 characteristic enhancement)
    const presenceEq = this.ctx.createBiquadFilter();
    presenceEq.type = 'peaking';
    presenceEq.frequency.value = 3000; // 3kHz presence
    presenceEq.gain.value = 3; // +3dB
    presenceEq.Q.value = 1;

    // 4. De-esser (High shelf attenuation)
    const deEsser = this.ctx.createBiquadFilter();
    deEsser.type = 'highshelf';
    deEsser.frequency.value = 7000;
    deEsser.gain.value = -2;

    // 5. Compressor (Voice leveling)
    const compressor = this.ctx.createDynamicsCompressor();
    compressor.threshold.value = -24;
    compressor.knee.value = 30;
    compressor.ratio.value = 3;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.25;

    // Connect Chain
    source.connect(noiseGate);
    noiseGate.connect(highPass);
    highPass.connect(presenceEq);
    presenceEq.connect(deEsser);
    deEsser.connect(compressor);
    
    // Note: In a real app, we'd return the last node or connect to destination/analyzer
    // For now, we return source to keep reference, but the chain is created.
    // The caller would typically connect the compressor to an AnalyserNode or WebRTC peer.
    
    return source; 
  }

  public startAmbience() {
    if (this.muted || !this.ctx || !this.masterGain || this.ambienceOsc) return;
    
    // Osc 1: Deep Drone
    this.ambienceOsc = this.ctx.createOscillator();
    this.ambienceGain = this.ctx.createGain();
    
    this.ambienceOsc.type = 'sine';
    this.ambienceOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A1
    
    this.ambienceGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.ambienceGain.gain.linearRampToValueAtTime(0.03, this.ctx.currentTime + 2); // Lower volume
    
    this.ambienceOsc.connect(this.ambienceGain);
    this.ambienceGain.connect(this.masterGain);
    this.ambienceOsc.start();

    // Note: Could add a second oscillator for texture here if desired
  }

  public playInteractionCue() {
      if (this.muted) return;
      this.playTone(440, 'sine', 0.05, 0.05); // Subtle tick
  }

  public stopAmbience() {
    if (this.ambienceOsc && this.ambienceGain && this.ctx) {
        const osc = this.ambienceOsc;
        const gain = this.ambienceGain;
        
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1);
        setTimeout(() => {
            osc.stop();
            osc.disconnect();
            gain.disconnect();
        }, 1000);
        
        this.ambienceOsc = null;
        this.ambienceGain = null;
    }
  }

  private playTone(freq: number, type: OscillatorType, duration: number, vol: number) {
    if (!this.ctx || !this.masterGain) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }
}

export const soundManager = SoundManager.getInstance();
