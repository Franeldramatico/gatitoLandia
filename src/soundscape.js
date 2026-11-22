// Short procedural field sounds; no downloads or autoplay before a gesture.
export function fieldSound(ctx, scene, period, volume, rainy = false) {
  if (!ctx || !volume || ctx.state !== 'running') return
  const now = ctx.currentTime

  function tone(hz, duration, delay, type = 'sine', end = hz, gainScale = 0.00024) {
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    const at = now + delay
    o.type = type
    o.frequency.setValueAtTime(hz, at)
    o.frequency.exponentialRampToValueAtTime(Math.max(20, end), at + duration)
    g.gain.setValueAtTime(0.00001, at)
    g.gain.exponentialRampToValueAtTime(volume * gainScale, at + 0.04)
    g.gain.exponentialRampToValueAtTime(0.00001, at + duration)
    o.connect(g).connect(ctx.destination)
    o.start(at)
    o.stop(at + duration + 0.02)
  }

  function breeze(cutoff = 360, level = 0.0011) {
    const len = Math.floor(ctx.sampleRate * 2.2)
    const b = ctx.createBuffer(1, len, ctx.sampleRate)
    const a = b.getChannelData(0)
    for (let i = 0; i < len; i++) a[i] = (Math.random() * 2 - 1) * Math.sin((Math.PI * i) / len) ** 2
    const n = ctx.createBufferSource()
    const f = ctx.createBiquadFilter()
    const g = ctx.createGain()
    n.buffer = b
    f.type = 'lowpass'
    f.frequency.value = cutoff
    g.gain.value = volume * level
    n.connect(f).connect(g).connect(ctx.destination)
    n.start()
  }

  if (rainy) {
    breeze(1150, 0.0014)
    tone(520, 0.25, 0.4, 'sine', 410, 0.00014)
    return
  }

  if (scene === 'rail') {
    for (let i = 0; i < 4; i++) tone(98, 0.14, i * 0.24, 'triangle', 58, 0.00022)
    tone(440, 0.48, 1.1, 'sine', 432, 0.00014)
    breeze(280, 0.0008)
  } else if (scene === 'cafe') {
    tone(1480, 0.24, 0, 'sine', 1510, 0.00018)
    tone(1980, 0.2, 0.19, 'sine', 1940, 0.00014)
    tone(392, 0.5, 0.55, 'triangle', 392, 0.0001)
  } else if (scene === 'roof' || scene === 'air') {
    breeze(scene === 'roof' ? 620 : 420, 0.0012)
    if (scene === 'roof') tone(523, 0.55, 0.7, 'sine', 523, 0.00012)
  } else if (scene === 'room' || scene === 'guest') {
    // Soft cozy home chord / wind-chime
    tone(period === 2 ? 330 : 440, 0.55, 0, 'sine', period === 2 ? 326 : 440, 0.00012)
    tone(period === 2 ? 415 : 554, 0.5, 0.28, 'sine', period === 2 ? 410 : 554, 0.0001)
  } else if (scene === 'desk' || scene === 'hall') {
    tone(175, 0.09, 0, 'triangle', 95, 0.00018)
    tone(587, 0.22, 0.45, 'sine', 587, 0.00012)
  } else if (scene === 'market') {
    tone(840, 0.36, 0, 'sine', 840, 0.00016)
    tone(1120, 0.3, 0.1, 'sine', 1120, 0.00014)
  } else if (period === 2) {
    tone(360, 0.4, 0, 'sine', 290, 0.00015)
    tone(262, 0.55, 0.45, 'sine', 248, 0.00013)
  } else {
    tone(930, 0.18, 0, 'sine', 1460, 0.00016)
    tone(1420, 0.15, 0.24, 'sine', 1080, 0.00014)
  }
}
