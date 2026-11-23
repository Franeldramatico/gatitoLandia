const touch = '(pointer: coarse)'
export const rotated = () => matchMedia(`${touch} and (orientation: portrait)`).matches

export async function enterLandscape() {
  if (!matchMedia(touch).matches || !screen.orientation?.lock) return
  try {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen()
    await screen.orientation.lock('landscape')
  } catch { /* The CSS landscape stage also works in Safari and embedded browsers. */ }
}
export function leaveLandscape() {
  if (!matchMedia(touch).matches) return
  try { screen.orientation?.unlock?.() } catch {}
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
}
export function stagePoint(event, element) {
  const r = element.getBoundingClientRect()
  const x = (event.clientX - r.left) / r.width, y = (event.clientY - r.top) / r.height
  return rotated() ? [100*y, 100*(1-x)] : [100*x, 100*y]
}
