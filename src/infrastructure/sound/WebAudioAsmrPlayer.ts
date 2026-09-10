import type { SoundTriggerInfo } from '../../domain/squishy/model/Squishy'

export interface IAsmrSoundPlayer {
  playSquish(trigger: SoundTriggerInfo): void
  playRelease(trigger: SoundTriggerInfo): void
  unlockAudio(): Promise<void>
}

export class WebAudioAsmrPlayer implements IAsmrSoundPlayer {
  private audioCtxFactory: () => AudioContext | null
  private cachedContext: AudioContext | null = null

  constructor(audioCtxFactory?: () => AudioContext | null) {
    this.audioCtxFactory =
      audioCtxFactory ??
      (() => {
        if (typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
          return new AudioContextClass()
        }
        return null
      })
  }

  private getContext(): AudioContext | null {
    if (!this.cachedContext) {
      this.cachedContext = this.audioCtxFactory()
    }
    if (this.cachedContext && this.cachedContext.state === 'suspended') {
      this.cachedContext.resume().catch(() => {})
    }
    return this.cachedContext
  }

  async unlockAudio(): Promise<void> {
    const ctx = this.getContext()
    if (ctx && ctx.state === 'suspended') {
      await ctx.resume()
    }
  }

  playSquish(trigger: SoundTriggerInfo): void {
    if (trigger.soundType === 'silent' || trigger.volume <= 0) {
      return
    }

    const ctx = this.getContext()
    if (!ctx) return

    switch (trigger.soundType) {
      case 'air_slow':
        this.playAirSlow(ctx, trigger)
        break
      case 'crunch_beads':
        this.playCrunch(ctx, trigger)
        break
      case 'popping_candy':
        this.playPopping(ctx, trigger)
        break
      case 'slime_gel':
        this.playSlime(ctx, trigger)
        break
      case 'squeak_toy':
        this.playSqueak(ctx, trigger)
        break
      case 'soda_fizz':
        this.playSodaFizz(ctx, trigger)
        break
      case 'mochi_dango':
        this.playMochiDango(ctx, trigger)
        break
      case 'caramel_crust':
        this.playCaramelCrust(ctx, trigger)
        break
      case 'bell_charm':
        this.playBellCharm(ctx, trigger)
        break
      case 'cat_purr':
        this.playCatPurr(ctx, trigger)
        break
      case 'coin_1up':
        this.playCoin1Up(ctx, trigger)
        break
      case 'magic_wand':
        this.playMagicWand(ctx, trigger)
        break
      case 'forest_rustle':
        this.playForestRustle(ctx, trigger)
        break
      case 'puppy_bark':
        this.playPuppyBark(ctx, trigger)
        break
      case 'fire_crackle':
        this.playFireCrackle(ctx, trigger)
        break
      case 'bubble_pop':
        this.playBubblePop(ctx, trigger)
        break
      case 'ice_sparkle':
        this.playIceSparkle(ctx, trigger)
        break
      case 'ocean_wave':
        this.playOceanWave(ctx, trigger)
        break
      case 'music_box':
        this.playMusicBox(ctx, trigger)
        break
      case 'suction_pop':
        this.playSuctionPop(ctx, trigger)
        break
    }
  }

  playRelease(trigger: SoundTriggerInfo): void {
    if (trigger.soundType === 'silent' || trigger.volume <= 0) {
      return
    }

    const ctx = this.getContext()
    if (!ctx) return

    // Release sound is a softer, breath-like reverse or relaxation sound
    if (trigger.soundType === 'air_slow' || trigger.soundType === 'soda_fizz') {
      this.playAirSlow(ctx, { ...trigger, volume: trigger.volume * 0.7, pitch: trigger.pitch * 1.05 })
    } else if (trigger.soundType === 'slime_gel' || trigger.soundType === 'mochi_dango') {
      this.playSlime(ctx, { ...trigger, volume: trigger.volume * 0.5, pitch: trigger.pitch * 0.9 })
    } else if (trigger.soundType === 'bell_charm') {
      this.playBellCharm(ctx, { ...trigger, volume: trigger.volume * 0.4, pitch: trigger.pitch * 1.2 })
    }
  }

  private playAirSlow(ctx: AudioContext, trigger: SoundTriggerInfo): void {
    const duration = 0.6
    const sampleRate = ctx.sampleRate || 44100
    const bufferSize = Math.floor(sampleRate * duration)
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate)
    const output = buffer.getChannelData(0)

    // Pink-ish / soft airy noise
    let b0 = 0, b1 = 0, b2 = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.1538520
      output[i] = (b0 + b1 + b2 + white * 0.5362) * 0.15
    }

    const source = ctx.createBufferSource()
    source.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(400 * trigger.pitch, ctx.currentTime)
    filter.frequency.exponentialRampToValueAtTime(150 * trigger.pitch, ctx.currentTime + duration)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.01, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(trigger.volume * 0.5, ctx.currentTime + 0.1)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

    source.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    source.start(ctx.currentTime)
    source.stop(ctx.currentTime + duration)
  }

  private playCrunch(ctx: AudioContext, trigger: SoundTriggerInfo): void {
    const duration = 0.25
    const sampleRate = ctx.sampleRate || 44100
    const bufferSize = Math.floor(sampleRate * duration)
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate)
    const output = buffer.getChannelData(0)

    // Crackle / crunchy texture
    for (let i = 0; i < bufferSize; i++) {
      const isCrackle = Math.random() < 0.15 * (trigger.crackleCount / 5)
      output[i] = isCrackle ? (Math.random() * 2 - 1) * 0.7 : (Math.random() * 2 - 1) * 0.05
    }

    const source = ctx.createBufferSource()
    source.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(1800 * trigger.pitch, ctx.currentTime)
    filter.Q.setValueAtTime(2.0, ctx.currentTime)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(trigger.volume * 0.8, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)

    source.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    source.start(ctx.currentTime)
    source.stop(ctx.currentTime + duration)
  }

  private playPopping(ctx: AudioContext, trigger: SoundTriggerInfo): void {
    const burstCount = Math.max(2, trigger.crackleCount)
    for (let i = 0; i < burstCount; i++) {
      const delay = Math.random() * 0.2
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'square'
      const freq = (1200 + Math.random() * 1500) * trigger.pitch
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay)
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + delay + 0.03)

      gain.gain.setValueAtTime(trigger.volume * 0.2, ctx.currentTime + delay)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.03)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(ctx.currentTime + delay)
      osc.stop(ctx.currentTime + delay + 0.04)
    }
  }

  private playSlime(ctx: AudioContext, trigger: SoundTriggerInfo): void {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(320 * trigger.pitch, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(110 * trigger.pitch, ctx.currentTime + 0.18)

    gain.gain.setValueAtTime(trigger.volume * 0.6, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.2)
  }

  private playSqueak(ctx: AudioContext, trigger: SoundTriggerInfo): void {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(800 * trigger.pitch, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(1600 * trigger.pitch, ctx.currentTime + 0.08)
    osc.frequency.exponentialRampToValueAtTime(1200 * trigger.pitch, ctx.currentTime + 0.15)

    gain.gain.setValueAtTime(trigger.volume * 0.5, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.16)
  }

  private playSodaFizz(ctx: AudioContext, trigger: SoundTriggerInfo): void {
    const duration = 0.35
    const sampleRate = ctx.sampleRate || 44100
    const bufferSize = Math.floor(sampleRate * duration)
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate)
    const output = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      // High frequency fizzing noise with micro bursts
      const burst = Math.random() < 0.2 ? (Math.random() * 2 - 1) * 0.8 : (Math.random() * 2 - 1) * 0.1
      output[i] = burst
    }

    const source = ctx.createBufferSource()
    source.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.setValueAtTime(3200 * trigger.pitch, ctx.currentTime)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(trigger.volume * 0.35, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

    source.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    source.start(ctx.currentTime)
    source.stop(ctx.currentTime + duration)
  }

  private playMochiDango(ctx: AudioContext, trigger: SoundTriggerInfo): void {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(180 * trigger.pitch, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(80 * trigger.pitch, ctx.currentTime + 0.22)

    gain.gain.setValueAtTime(trigger.volume * 0.7, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.24)
  }

  private playCaramelCrust(ctx: AudioContext, trigger: SoundTriggerInfo): void {
    // Sharp crack + crumbly crunch
    const duration = 0.2
    const sampleRate = ctx.sampleRate || 44100
    const bufferSize = Math.floor(sampleRate * duration)
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate)
    const output = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      const crack = i < 150 ? (Math.random() * 2 - 1) * 1.0 : (Math.random() * 2 - 1) * 0.2
      output[i] = crack
    }

    const source = ctx.createBufferSource()
    source.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(2400 * trigger.pitch, ctx.currentTime)
    filter.Q.setValueAtTime(1.5, ctx.currentTime)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(trigger.volume * 0.75, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

    source.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    source.start(ctx.currentTime)
    source.stop(ctx.currentTime + duration)
  }

  private playBellCharm(ctx: AudioContext, trigger: SoundTriggerInfo): void {
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const gain = ctx.createGain()

    osc1.type = 'sine'
    osc2.type = 'sine'
    osc1.frequency.setValueAtTime(1760 * trigger.pitch, ctx.currentTime) // A6
    osc2.frequency.setValueAtTime(2640 * trigger.pitch, ctx.currentTime) // E7

    gain.gain.setValueAtTime(trigger.volume * 0.35, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)

    osc1.connect(gain)
    osc2.connect(gain)
    gain.connect(ctx.destination)

    osc1.start(ctx.currentTime)
    osc2.start(ctx.currentTime)
    osc1.stop(ctx.currentTime + 0.42)
    osc2.stop(ctx.currentTime + 0.42)
  }

  private playCatPurr(ctx: AudioContext, trigger: SoundTriggerInfo): void {
    const osc = ctx.createOscillator()
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    const mainGain = ctx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(45 * trigger.pitch, ctx.currentTime)

    // LFO purr modulation (~25Hz)
    lfo.type = 'sine'
    lfo.frequency.setValueAtTime(25, ctx.currentTime)
    lfoGain.gain.setValueAtTime(0.5, ctx.currentTime)

    lfo.connect(lfoGain)
    lfoGain.connect(mainGain.gain)

    mainGain.gain.setValueAtTime(trigger.volume * 0.4, ctx.currentTime)
    mainGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(120, ctx.currentTime)

    osc.connect(filter)
    filter.connect(mainGain)
    mainGain.connect(ctx.destination)

    osc.start(ctx.currentTime)
    lfo.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.5)
    lfo.stop(ctx.currentTime + 0.5)
  }

  private playCoin1Up(ctx: AudioContext, trigger: SoundTriggerInfo): void {
    // 2-tone arcade coin chime (B5 987Hz -> E6 1318Hz)
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'square'
    osc.frequency.setValueAtTime(987.77 * trigger.pitch, t)
    osc.frequency.setValueAtTime(1318.51 * trigger.pitch, t + 0.08)

    gain.gain.setValueAtTime(trigger.volume * 0.25, t)
    gain.gain.setValueAtTime(trigger.volume * 0.28, t + 0.08)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(t)
    osc.stop(t + 0.42)
  }

  private playMagicWand(ctx: AudioContext, trigger: SoundTriggerInfo): void {
    // Sparkling multi-tone magical bell cascade (Princess & Precure)
    const t = ctx.currentTime
    const freqs = [1046.5, 1318.5, 1567.98, 2093.0, 2637.0] // C6, E6, G6, C7, E7
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(f * trigger.pitch, t + idx * 0.04)

      gain.gain.setValueAtTime(0.001, t + idx * 0.04)
      gain.gain.linearRampToValueAtTime(trigger.volume * 0.18, t + idx * 0.04 + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.04 + 0.35)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(t + idx * 0.04)
      osc.stop(t + idx * 0.04 + 0.38)
    })
  }

  private playForestRustle(ctx: AudioContext, trigger: SoundTriggerInfo): void {
    // Forest leaves whisper + gentle wooden acorn tap (Totoro / Ghibli)
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(440 * trigger.pitch, t)
    osc.frequency.exponentialRampToValueAtTime(220 * trigger.pitch, t + 0.08)

    oscGain.gain.setValueAtTime(trigger.volume * 0.35, t)
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.09)

    osc.connect(oscGain)
    oscGain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.1)

    // Leaf rustle noise
    const duration = 0.35
    const sampleRate = ctx.sampleRate || 44100
    const bufferSize = Math.floor(sampleRate * duration)
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.1
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(1200 * trigger.pitch, t)
    filter.Q.setValueAtTime(2.0, t)

    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(trigger.volume * 0.3, t)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + duration)

    noise.connect(filter)
    filter.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    noise.start(t)
    noise.stop(t + duration)
  }

  private playPuppyBark(ctx: AudioContext, trigger: SoundTriggerInfo): void {
    // Cheerful PAW Patrol rescue pup bark whistle
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(750 * trigger.pitch, t)
    osc.frequency.linearRampToValueAtTime(1100 * trigger.pitch, t + 0.04)
    osc.frequency.exponentialRampToValueAtTime(400 * trigger.pitch, t + 0.15)

    gain.gain.setValueAtTime(0.01, t)
    gain.gain.linearRampToValueAtTime(trigger.volume * 0.45, t + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(t)
    osc.stop(t + 0.2)
  }

  private playFireCrackle(ctx: AudioContext, trigger: SoundTriggerInfo): void {
    // Calcifer hearth campfire crackle pops
    const t = ctx.currentTime
    const pops = 5
    for (let i = 0; i < pops; i++) {
      const popTime = t + i * 0.035 + Math.random() * 0.02
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'square'
      osc.frequency.setValueAtTime((300 + Math.random() * 600) * trigger.pitch, popTime)

      gain.gain.setValueAtTime(trigger.volume * 0.25, popTime)
      gain.gain.exponentialRampToValueAtTime(0.001, popTime + 0.03)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(popTime)
      osc.stop(popTime + 0.035)
    }
  }

  private playBubblePop(ctx: AudioContext, trigger: SoundTriggerInfo): void {
    // Satisfying bubble wrap pop
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(250 * trigger.pitch, t)
    osc.frequency.exponentialRampToValueAtTime(800 * trigger.pitch, t + 0.06)

    gain.gain.setValueAtTime(trigger.volume * 0.45, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(t)
    osc.stop(t + 0.09)
  }

  private playIceSparkle(ctx: AudioContext, trigger: SoundTriggerInfo): void {
    // Elsa snow crystal frost chime
    const t = ctx.currentTime
    const freqs = [1760, 2349, 3136] // A6, D7, G7
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(f * trigger.pitch, t + i * 0.03)

      gain.gain.setValueAtTime(trigger.volume * 0.25, t + i * 0.03)
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.03 + 0.3)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(t + i * 0.03)
      osc.stop(t + i * 0.03 + 0.32)
    })
  }

  private playOceanWave(ctx: AudioContext, trigger: SoundTriggerInfo): void {
    // Ariel ocean shell whisper wave
    const t = ctx.currentTime
    const duration = 0.5
    const sampleRate = ctx.sampleRate || 44100
    const bufferSize = Math.floor(sampleRate * duration)
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const source = ctx.createBufferSource()
    source.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(400 * trigger.pitch, t)
    filter.frequency.linearRampToValueAtTime(900 * trigger.pitch, t + duration * 0.5)
    filter.frequency.exponentialRampToValueAtTime(250 * trigger.pitch, t + duration)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.01, t)
    gain.gain.linearRampToValueAtTime(trigger.volume * 0.4, t + duration * 0.4)
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration)

    source.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    source.start(t)
    source.stop(t + duration)
  }

  private playMusicBox(ctx: AudioContext, trigger: SoundTriggerInfo): void {
    // Delicate music box tune
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(1046.5 * trigger.pitch, t) // C6

    gain.gain.setValueAtTime(trigger.volume * 0.35, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.48)
  }

  private playSuctionPop(ctx: AudioContext, trigger: SoundTriggerInfo): void {
    // Suction cup release pop
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(600 * trigger.pitch, t)
    osc.frequency.exponentialRampToValueAtTime(120 * trigger.pitch, t + 0.07)

    gain.gain.setValueAtTime(trigger.volume * 0.4, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.09)
  }
}
