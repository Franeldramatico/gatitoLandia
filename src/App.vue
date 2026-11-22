<script setup>
import { reactive, computed, ref, watch, onMounted, onUnmounted, nextTick, defineAsyncComponent } from 'vue'
import { useStory, titles } from './useStory.js'
import { fieldSound } from './soundscape.js'
import MenuArt from './MenuArt.vue'
import UiIcon from './components/UiIcon.vue'
import portraitF from './portraits/retrato-franxito.webp?inline'
import portraitA from './portraits/retrato-aranxita.webp?inline'
import { objects, blocked, pathTo } from './paths.js'
import { rain } from './barrio.js'

const Illustration = defineAsyncComponent(() => import('./scene/Illustration.vue'))
const KiteFlight = defineAsyncComponent(() => import('./KiteFlight.vue'))
const Directory = defineAsyncComponent(() => import('./Directory.vue'))
import './postales.css'
import './living.css'

const prefs = reactive({ lang: 'es', volume: 35, ambient: 22, voice: 35, text: 100 })
try { Object.assign(prefs, JSON.parse(localStorage.getItem('villaPrefs'))) } catch {}
watch(
  prefs,
  () => {
    document.documentElement.lang = prefs.lang
    try { localStorage.setItem('villaPrefs', JSON.stringify(prefs)) } catch {}
  },
  { immediate: true },
)

const { s, page, slots, resume, store, mini, map, restore, collect, dialog, line, nodes, name, unit, place, bond, level, other, showOther, start, next, move, t } = useStory(prefs)
const assets = import.meta.glob('../habitantes/*.png', { eager: true, import: 'default' })
const img = (n, p) => assets[`../habitantes/${n.toLowerCase()}-${p}.png`]
const play = computed(() => page.value === 'play')
const night = computed(() => s.scene === 'rail' || s.period === 2)
const companionX = computed(() => (s.scene === 'hall' ? 76 : 64))
const moving = ref(false), bubble = ref(null), world = ref(null), replace = ref(null), coverLunar = ref(false)
const camera = ref(null), album = ref(false), offset = ref(0), stageWidth = ref(innerWidth), viewportWidth = ref(innerWidth), stride = ref(false)
const photo = ref(false), pending = ref(null), notice = ref(''), offline = ref(false)
const sceneArt = computed(() => (s.scene === 'guest' ? 'room' : s.scene === 'glass' ? 'garden' : s.scene))
const canPanLeft = computed(() => stageWidth.value > viewportWidth.value + 16 && offset.value > 12)
const canPanRight = computed(() => stageWidth.value > viewportWidth.value + 16 && offset.value < stageWidth.value - viewportWidth.value - 12)

async function saveCopy(v) {
  const { download } = await import('./keepsakes.js')
  download(new Blob([JSON.stringify({ version: 1, route: v })], { type: 'application/json' }), `villa-${v.actor ? '18' : '15'}-dia-${v.day}.json`)
}

async function readCopy(e) {
  try {
    const f = e.target.files[0]
    if (!f) return
    if (f.size > 200000) throw Error()
    const { decodeSave } = await import('./keepsakes.js')
    pending.value = decodeSave(await f.text())
    notice.value = ''
  } catch {
    notice.value = t('No se reconoce esta partida.', 'Unrecognized save file.')
  } finally {
    e.target.value = ''
  }
}

async function shoot() {
  try {
    const { photograph } = await import('./keepsakes.js')
    await photograph(world.value, camera.value.scrollLeft, camera.value.clientWidth, `${place.value} · ${t('Día', 'Day')} ${s.day} · Villa Bigotes`)
  } catch {
    notice.value = t('No se pudo crear la postal.', 'Could not create the postcard.')
  }
}

async function cacheGame() {
  try {
    if (!import.meta.env.PROD) throw Error('dev')
    if (!('serviceWorker' in navigator)) throw Error()
    await navigator.serviceWorker.register(import.meta.env.BASE_URL + 'sw.js')
    const reg = await navigator.serviceWorker.ready
    await new Promise((ok, bad) => {
      const ch = new MessageChannel()
      ch.port1.onmessage = e => (e.data === 'ok' ? ok() : bad())
      reg.active.postMessage('download', [ch.port2])
    })
    offline.value = true
    notice.value = t('Listo sin red. Puedes instalarlo desde el menú del navegador.', 'Ready offline. Install it from your browser menu.')
  } catch (e) {
    notice.value = e.message === 'dev'
      ? t('Disponible en la versión de producción (npm run preview).', 'Available in the production preview.')
      : t('Descarga incompleta. Inténtalo con conexión.', 'Download incomplete. Try again online.')
  }
}

let timer, audio, frame = 0, last = 0, goal = null, returnLabel = '', ambience, travelled = 0
const held = new Set(), facing = ref(1)
const pose = computed(() => (line.value?.[0] === 'me' ? 'quieta' : moving.value ? 'camina' : s.scene === 'rail' ? 'sienta' : 'quieta'))
const flip = computed(() => facing.value * (s.actor && pose.value === 'camina' ? -1 : 1))

function sound(knock = false) {
  try {
    audio ??= new AudioContext()
    audio.resume().catch(() => {})
    if (!prefs.volume) return
    for (let i = 0; i < (knock ? 2 : 1); i++) {
      const o = audio.createOscillator(), g = audio.createGain(), at = audio.currentTime + i * 0.16
      o.type = knock ? 'triangle' : 'sine'
      o.frequency.value = knock ? 135 : 660
      g.gain.setValueAtTime(0.001, at)
      g.gain.exponentialRampToValueAtTime(prefs.volume * 0.0008, at + 0.012)
      g.gain.exponentialRampToValueAtTime(0.0001, at + 0.13)
      o.connect(g).connect(audio.destination)
      o.start(at)
      o.stop(at + 0.14)
    }
  } catch {}
}

function select(i) {
  sound()
  if (slots[i]) { replace.value = i; return }
  start(i)
}

function walk(x, y) {
  if (dialog.value || blocked(s, x, y)) return
  if (x !== s.x) facing.value = Math.sign(x - s.x)
  travelled += Math.hypot(x - s.x, y - s.y)
  stride.value = Math.floor(travelled / 2) % 2 === 1
  move(x, y)
  moving.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (moving.value = false), 160)
}

function approach(x, y, done) {
  stop()
  const path = pathTo(s, x, y)
  if (!path.length) return
  goal = { ...path.shift(), path, done }
  last = performance.now()
  frame = requestAnimationFrame(step)
}

function point(e) {
  const r = world.value.getBoundingClientRect()
  approach(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100)
}

function activate(n) {
  returnLabel = n.label
  approach(n.x, Math.max(72, n.y + 8), () => {
    sound(n.icon === '♧')
    n.run()
  })
}

function syncCamera() {
  offset.value = camera.value?.scrollLeft ?? 0
  viewportWidth.value = camera.value?.clientWidth ?? innerWidth
  stageWidth.value = world.value?.offsetWidth ?? innerWidth
}

function pan() {
  if (!camera.value) return
  syncCamera()
  if (stageWidth.value > viewportWidth.value) {
    camera.value.scrollLeft = (s.x / 100) * stageWidth.value - viewportWidth.value / 2
    syncCamera()
  }
}

function panBy(dir) {
  if (!camera.value) return
  camera.value.scrollBy({ left: dir * viewportWidth.value * 0.45, behavior: 'smooth' })
}

function project(x) {
  return (x / 100) * stageWidth.value - offset.value
}

const anchor = computed(() => {
  const who = line.value?.[0]
  return who === 'me' ? [s.x, s.y - 24] : who === 'other' ? [companionX.value, 59] : who === 'door' ? [81, 42] : s.scene === 'rail' ? [50, 62] : [65, 48]
})
const bubbleX = computed(() => `clamp(min(43vw, 183px), ${project(anchor.value[0])}px, calc(100vw - min(43vw, 183px)))`)
const speaker = computed(() => ({
  me: name.value,
  other: other.value,
  door: t('Detrás de la puerta', 'Behind the door'),
  object: s.scene === 'rail' ? t('Celular', 'Phone') : s.scene === 'desk' ? t('Recepción', 'Reception') : place.value,
})[line.value?.[0]])

function step(stamp) {
  frame = 0
  if ((!held.size && !goal) || !play.value || dialog.value || mini.value || album.value) return
  const dx = Number(held.has('ArrowRight')) - Number(held.has('ArrowLeft'))
  const dy = Number(held.has('ArrowDown')) - Number(held.has('ArrowUp'))
  const dt = Math.min(0.04, Math.max(0.001, (stamp - last) / 1000))
  const len = Math.hypot(dx, dy) || 1
  const speed = Math.min(innerWidth, innerHeight) * 0.68
  const w = stageWidth.value
  const h = world.value?.offsetHeight || innerHeight
  if (goal) {
    const ax = ((goal.x - s.x) * w) / 100
    const ay = ((goal.y - s.y) * h) / 100
    const dist = Math.hypot(ax, ay)
    const k = Math.min(1, (speed * dt) / (dist || 1))
    walk(s.x + (goal.x - s.x) * k, s.y + (goal.y - s.y) * k)
    pan()
    if (k === 1) {
      if (goal.path.length) Object.assign(goal, goal.path.shift())
      else {
        const done = goal.done
        stop()
        done?.()
        return
      }
    }
  } else if (dx || dy) {
    walk(s.x + (((dx * speed * dt) / len / w) * 100), s.y + (((dy * speed * dt) / len / h) * 100))
    pan()
  }
  last = stamp
  frame = requestAnimationFrame(step)
}

function stop() {
  goal = null
  held.clear()
  cancelAnimationFrame(frame)
  frame = 0
  clearTimeout(timer)
  moving.value = false
}

function release(e) {
  if (held.delete(e.key) && !held.size) stop()
}

function keyboard(e) {
  if (!play.value || dialog.value || mini.value || album.value || map.value || photo.value || e.altKey || e.metaKey || e.ctrlKey) return
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
    e.preventDefault()
    goal = null
    held.add(e.key)
    if (!frame) {
      last = performance.now() - 16
      step(performance.now())
    }
  }
}

watch(line, async v => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    if (v?.[0] === 'door' && prefs.voice) {
      const voice = new SpeechSynthesisUtterance(v[1])
      voice.lang = prefs.lang === 'en' ? 'en-US' : 'es-ES'
      voice.volume = prefs.voice / 100
      voice.rate = 0.95
      window.speechSynthesis.speak(voice)
    }
  }
  await nextTick()
  if (v) {
    if (camera.value) {
      camera.value.scrollLeft = (anchor.value[0] / 100) * stageWidth.value - innerWidth / 2
      syncCamera()
    }
    bubble.value?.focus({ preventScroll: true })
  } else if (play.value) {
    const buttons = [...world.value.querySelectorAll('.node')]
    ;(buttons.find(b => b.textContent.includes(returnLabel)) || buttons[0])?.focus()
  }
})

watch([page, dialog, map, photo, () => s.scene], stop)
watch(play, v => {
  if (v) {
    for (const p of ['camina', 'quieta', 'pasito', 'habla']) {
      const i = new Image()
      i.src = img(name.value, p)
    }
  }
})

function flush() { if (play.value) store() }
watch([page, () => s.scene], async () => { await nextTick(); pan() })
const isRainy = computed(() => rain(s.day) && ['glass', 'roof', 'garden'].includes(s.scene))
const arrivalNote = ref('')
let arrivalTimer = 0
function triggerArrivalNote() {
  clearTimeout(arrivalTimer)
  if (!play.value || !['rail', 'air'].includes(s.scene)) { arrivalNote.value = ''; return }
  arrivalNote.value = s.scene === 'rail'
    ? t('00:18 · El último expreso nocturno frena bajo los faroles del andén.', '00:18 · The last night express glides to a halt beneath the platform lamps.')
    : t('09:15 · El vuelo toca pista frente a la terminal de GatitoLandia.', '09:15 · The flight touches down beside the GatitoLandia terminal.')
  arrivalTimer = setTimeout(() => { arrivalNote.value = '' }, 5400)
}
watch([play, () => s.scene], triggerArrivalNote, { immediate: true })
watch(dialog, v => { if (v) arrivalNote.value = '' })
watch([page, () => s.scene, () => s.period, () => prefs.ambient, isRainy], () => {
  clearInterval(ambience)
  if (play.value) {
    const ring = () => { if (!document.hidden) fieldSound(audio, s.scene, s.period, prefs.ambient, isRainy.value) }
    ring()
    ambience = setInterval(ring, 5400)
  }
})

const burst = ref(0)
let burstTimer = 0
watch(() => s.points, (nv, ov) => {
  if (play.value && ov !== undefined && nv > ov) {
    burst.value += 1
    clearTimeout(burstTimer)
    burstTimer = setTimeout(() => { burst.value = 0 }, 1100)
  }
})
watch(play, v => { if (v) coverLunar.value = false })

onMounted(() => {
  window.addEventListener('resize', pan)
  window.addEventListener('pagehide', flush)
  window.addEventListener('keydown', keyboard)
  window.addEventListener('keyup', release)
  window.addEventListener('blur', stop)
})
onUnmounted(() => {
  clearInterval(ambience)
  clearTimeout(arrivalTimer)
  clearTimeout(burstTimer)
  window.removeEventListener('resize', pan)
  window.removeEventListener('pagehide', flush)
  window.removeEventListener('keydown', keyboard)
  window.removeEventListener('keyup', release)
  window.removeEventListener('blur', stop)
  stop()
})
</script>

<template>
  <main class="viewport" :class="{ playing: play, 'lunar-hover': !play && coverLunar }" :style="{ '--reading': prefs.text / 100 }">
    <template v-if="!play">
      <MenuArt :lunar="coverLunar" />
      <div class="wash"></div>

      <header class="mast">
        <strong>
          <UiIcon name="brand" :size="22" />
          <span>GatitoLandia</span>
        </strong>
        <span>{{ t('COLECCIÓN DE POSTALES', 'POSTCARD COLLECTION') }} · 01</span>
      </header>

      <div class="cover" :inert="page === 'settings' || replace !== null">
        <div class="intro">
          <div class="kicker">
            <UiIcon name="spark" :size="13" />
            <span>{{ t('HISTORIAS DEL EDIFICIO', 'BUILDING STORIES') }}</span>
          </div>
          <h1>Villa<br><em>Bigotes</em></h1>
          <svg class="title-rule" width="132" height="14" viewBox="0 0 132 14" fill="none" aria-hidden="true">
            <path d="M2 7h48M82 7h48" stroke="currentColor" stroke-width="1.2" opacity=".45" />
            <path d="M58 7c2.5-3.5 5.5-3.5 8 0 2.5-3.5 5.5-3.5 8 0-2.5 3.5-5.5 3.5-8 0-2.5 3.5-5.5 3.5-8 0Z" stroke="currentColor" stroke-width="1.2" opacity=".75" />
            <circle cx="66" cy="7" r="1.6" fill="currentColor" />
          </svg>
          <p>{{ t('Dos llaves. Un pasillo. Dos maneras de llegar a casa.', 'Two keys. One hallway. Two ways to come home.') }}</p>
          <p class="slot-tip">{{ t('Cada postal guarda su propia historia.', 'Each postcard keeps its own story.') }}</p>
          <button class="quiet" @click="page = 'settings'; sound()">
            <UiIcon name="sliders" :size="16" />
            <span>{{ t('Sonido e idioma', 'Sound and language') }}</span>
          </button>
        </div>

        <div class="routes">
          <div class="kicker">{{ t('INICIAR PARTIDA · ELIGE TU POSTAL', 'START GAME · PICK A POSTCARD') }}</div>
          <button
            v-for="(cat, i) in ['Franxito', 'Aranxita']"
            :key="cat"
            class="ticket"
            :class="{ lunar: i }"
            @mouseenter="i && (coverLunar = true)"
            @mouseleave="i && (coverLunar = false)"
            @focusin="i && (coverLunar = true)"
            @focusout="i && (coverLunar = false)"
            @click="select(i)"
          >
            <span class="stamp" aria-hidden="true">
              <UiIcon :name="i ? 'moon' : 'sun'" :size="18" />
            </span>
            <svg class="postmark" width="52" height="52" viewBox="0 0 56 56" fill="none" aria-hidden="true">
              <circle cx="28" cy="28" r="20" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3 2" />
              <circle cx="28" cy="28" r="14" stroke="currentColor" stroke-width=".9" />
              <path d="M4 21q6-3 12 0t12 0M4 27q6-3 12 0t12 0" stroke="currentColor" stroke-width="1" />
              <text x="28" y="29" text-anchor="middle" fill="currentColor" font-size="5.5" font-weight="700" letter-spacing=".8">VB · 01</text>
            </svg>
            <img :src="i ? portraitA : portraitF" :alt="cat" />
            <span class="ticketcopy">
              <small>{{ i ? t('TREN NOCTURNO', 'NIGHT TRAIN') : t('VUELO DE LLEGADA', 'ARRIVAL FLIGHT') }} · {{ i ? '18' : '15' }}</small>
              <b>{{ cat }}</b>
              <i v-if="slots[i]">{{ t('Día', 'Day') }} {{ slots[i].day }} · {{ t(...titles[slots[i].scene]) }} →</i>
              <i v-else>{{ i ? t('La última estación', 'The last station') : t('Un billete de ida', 'A one-way ticket') }} →</i>
            </span>
          </button>
        </div>
      </div>

      <div v-if="page === 'settings' || replace !== null" class="veil">
        <section class="sheet" role="dialog" aria-modal="true" :aria-label="t('Opciones', 'Options')">
          <template v-if="replace !== null">
            <header class="sheet-head">
              <div class="sheet-badge" aria-hidden="true"><UiIcon name="key" :size="18" /></div>
              <div>
                <small>{{ replace ? t('DEPTO. 18', 'NO. 18') : t('DEPTO. 15', 'NO. 15') }}</small>
                <h2>{{ replace ? 'Aranxita' : 'Franxito' }}</h2>
              </div>
            </header>
            <p>{{ t('Puedes continuar esta postal o volver al día de la llegada. Reiniciar sustituye solo esta ruta.', 'Continue this postcard or return to arrival day. Restart replaces this route only.') }}</p>
            <div class="sheet-actions">
              <button class="ink" @click="resume(replace); replace = null">{{ t('Continuar', 'Continue') }}</button>
              <button @click="saveCopy(slots[replace])">{{ t('Exportar copia', 'Export save') }}</button>
              <button @click="start(replace); replace = null">{{ t('Reiniciar ruta', 'Restart route') }}</button>
              <button @click="replace = null">{{ t('Volver', 'Back') }}</button>
            </div>
          </template>
          <template v-else>
            <header class="sheet-head">
              <div class="sheet-badge" aria-hidden="true"><UiIcon name="sliders" :size="18" /></div>
              <div>
                <small>VILLA BIGOTES</small>
                <h2>{{ t('Ajustes', 'Settings') }}</h2>
              </div>
            </header>
            <label>
              <span>{{ t('Idioma', 'Language') }}</span>
              <select v-model="prefs.lang">
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </label>
            <label>
              <span>{{ t('Efectos', 'Effects') }} · {{ prefs.volume }}%</span>
              <input type="range" v-model.number="prefs.volume" @change="sound()" />
            </label>
            <label>
              <span>{{ t('Ambiente', 'Ambience') }} · {{ prefs.ambient }}%</span>
              <input type="range" v-model.number="prefs.ambient" />
            </label>
            <label>
              <span>{{ t('Voz', 'Voice') }} · {{ prefs.voice }}%</span>
              <input type="range" v-model.number="prefs.voice" />
            </label>
            <label>
              <span>{{ t('Tamaño del texto', 'Text size') }} · {{ prefs.text }}%</span>
              <input type="range" min="90" max="150" step="10" v-model.number="prefs.text" />
            </label>
            <label>
              <span>{{ t('Importar copia', 'Import save') }}</span>
              <input type="file" accept=".json" @change="readCopy" />
            </label>
            <p v-if="pending" class="pending-box">
              {{ pending.actor ? 'Aranxita' : 'Franxito' }} · {{ t('Día', 'Day') }} {{ pending.day }} · {{ t(...titles[pending.scene]) }}
              <span class="sheet-actions">
                <button @click="restore(pending); pending = null">{{ t('Usar esta copia y reemplazar esa ruta', 'Use this copy and replace its slot') }}</button>
                <button @click="pending = null">{{ t('Cancelar', 'Cancel') }}</button>
              </span>
            </p>
            <div class="sheet-actions">
              <button @click="cacheGame" :disabled="offline">{{ t('Descargar para jugar sin red', 'Download for offline play') }}</button>
              <button class="ink" @click="page = 'menu'; pending = null; sound()">
                <UiIcon name="back" :size="15" />
                <span>{{ t('Volver', 'Back') }}</span>
              </button>
            </div>
            <p role="status" class="status-note">{{ notice }}</p>
          </template>
        </section>
      </div>
    </template>

    <template v-else>
      <div ref="camera" class="camera-scroll" :inert="album || map || !!mini || !!dialog" @scroll.passive="syncCamera">
        <div
          ref="world"
          class="world"
          :style="photo ? { width: 'max(115vw,calc(100dvh * 800 / 340))' } : {}"
          :class="{ evening: s.period === 1, nocturne: night }"
          @click.self="!photo && point($event)"
        >
          <Illustration
            :key="s.scene"
            :scene="sceneArt"
            :greenhouse="s.scene === 'glass'"
            :rainy="isRainy"
            :plant="s.seedDay ? (s.day > s.seedDay ? (s.flower ? 2 : 3) : 1) : 0"
            :furniture="objects(s)"
            :night="night"
            :period="s.period"
            :actor="s.scene === 'guest' ? 1 - s.actor : s.actor"
            :day="s.day"
            :decor="s.scene === 'guest' ? 9 : s.decor"
            :bag="s.scene === 'hall' && s.actor && !s.bag"
            :bought="s.bought"
          />
          <div v-if="night && s.scene !== 'rail'" class="moonlight"></div>
          <div :key="'wash-' + s.scene" class="page-wash" aria-hidden="true"></div>

          <div v-if="burst" :key="'burst-' + burst" class="bond-burst" :style="{ left: s.x + '%', top: (s.y - 16) + '%' }" aria-hidden="true">
            <UiIcon name="heart" :size="14" />
            <UiIcon name="spark" :size="12" />
            <UiIcon name="heart" :size="11" />
          </div>

          <div
            class="actor controlled"
            :class="{ walking: moving, speaking: line?.[0] === 'me', listening: line?.[0] === 'other' }"
            :style="{ left: s.x + '%', top: s.y + '%', '--face': dialog && showOther ? (s.x < companionX ? 1 : -1) : flip }"
          >
            <img :src="img(name, moving && stride ? 'pasito' : pose)" :alt="name" />
            <img v-if="line?.[0] === 'me'" :src="img(name, 'habla')" alt="" class="talkframe" />
          </div>

          <div
            v-if="showOther"
            class="actor"
            :class="{
              speaking: line?.[0] === 'other',
              shy: dialog && s.scene === 'hall' && s.actor && !s.bag && line?.[0] === 'other',
              greeting: dialog && s.scene === 'market' && !s.gift,
            }"
            :style="{ left: companionX + '%', top: '83%', transform: `translate(-50%,-100%) scaleX(${s.x < companionX ? -1 : 1})` }"
          >
            <img :src="img(other, 'quieta')" :alt="other" />
            <img v-if="line?.[0] === 'other'" :src="img(other, 'habla')" alt="" class="talkframe" />
          </div>

          <template v-if="!dialog && !photo">
            <button
              v-for="n in nodes"
              :key="s.scene + n.label"
              class="node"
              :class="{ milestone: ['✦', '◇', '♡', '♧', '⚿'].includes(n.icon) }"
              :disabled="moving"
              :style="{ left: n.x + '%', top: n.y + '%' }"
              @click="activate(n)"
            >
              <i><UiIcon :name="n.icon" :size="18" /></i>
              <span>{{ n.label }}</span>
            </button>
          </template>
        </div>
      </div>

      <div v-if="canPanLeft && !photo && !dialog && !mini && !album && !map" class="pan-fade left" aria-hidden="true"></div>
      <div v-if="canPanRight && !photo && !dialog && !mini && !album && !map" class="pan-fade right" aria-hidden="true"></div>

      <button
        v-if="canPanLeft && !photo && !dialog && !mini && !album && !map"
        class="pan-edge left"
        :aria-label="t('Explorar a la izquierda', 'Pan left')"
        @click="panBy(-1)"
      >
        <UiIcon name="chevron" :size="20" />
      </button>
      <button
        v-if="canPanRight && !photo && !dialog && !mini && !album && !map"
        class="pan-edge right"
        :aria-label="t('Explorar a la derecha', 'Pan right')"
        @click="panBy(1)"
      >
        <UiIcon name="chevron" :size="20" />
      </button>

      <div v-if="arrivalNote && !dialog && !photo" class="arrival-caption" aria-live="polite">
        <UiIcon :name="s.scene === 'rail' ? 'moon' : 'sun'" :size="15" />
        <span>{{ arrivalNote }}</span>
      </div>

      <button
        v-if="line"
        ref="bubble"
        class="speech"
        :style="{ left: bubbleX, top: anchor[1] + '%', '--tip': `clamp(10%, calc(50% + ${project(anchor[0])}px - ${bubbleX}), 90%)` }"
        @click="next(); sound()"
      >
        <small class="speaker-head">
          <img
            v-if="line[0] === 'me' || line[0] === 'other'"
            class="speaker-mini"
            :src="(line[0] === 'me' ? s.actor : 1 - s.actor) ? portraitA : portraitF"
            alt=""
          />
          <UiIcon v-else :name="line[0] === 'door' ? 'knock' : s.scene === 'rail' ? 'phone' : s.scene === 'desk' ? 'key' : 'spark'" :size="12" />
          <span>{{ speaker }}</span>
        </small>
        <span aria-live="polite">{{ line[1] }}</span>
        <b><UiIcon name="chevron" :size="15" /></b>
      </button>

      <div v-if="!photo" class="hud">
        <small class="hud-meta">
          <span>{{ name }}</span>
          <span aria-hidden="true">·</span>
          <span>{{ t('DÍA', 'DAY') }} {{ s.day }}</span>
          <span aria-hidden="true">·</span>
          <UiIcon :name="['sun', 'twilight', 'moon'][s.period]" :size="12" />
        </small>
        <h2>{{ place }}</h2>
        <span class="hud-bond">
          <span>{{ bond }}</span>
          <span aria-hidden="true">·</span>
          <UiIcon name="heart" :size="13" />
          <span class="tabular">{{ level }}/100</span>
        </span>
        <div class="hud-meter" aria-hidden="true"><span :style="{ width: `${level}%` }"></span></div>
        <small class="pan-tip">
          <UiIcon name="swipe" :size="11" />
          <span>{{ t('Desliza para explorar', 'Swipe to explore') }}</span>
        </small>
      </div>

      <button
        v-if="!photo"
        class="homebtn"
        :aria-label="t('Menú principal', 'Main menu')"
        :disabled="!!dialog || !!mini || album || map"
        @click="store(); page = 'menu'; sound()"
      >
        <UiIcon name="menu" :size="20" />
      </button>

      <button
        v-if="!photo"
        class="album-btn"
        :disabled="!!dialog || !!mini || album || map"
        @click="stop(); album = true"
      >
        <UiIcon name="album" :size="15" />
        <span>{{ t('Álbum', 'Album') }} · {{ s.album.length }}</span>
      </button>

      <div v-if="map" class="veil">
        <Directory :t="t" :met="s.met" @close="map = false" />
      </div>

      <div v-if="photo" class="photo-frame" aria-hidden="true">
        <span>{{ place }} · {{ t('Día', 'Day') }} {{ s.day }} · Villa Bigotes</span>
      </div>

      <div v-if="photo" class="photo-tools">
        <label>
          <span>{{ t('Encuadre', 'Frame') }}</span>
          <input type="range" min="0" max="100" value="50" @input="camera.scrollLeft = (world.offsetWidth - camera.clientWidth) * $event.target.value / 100" />
        </label>
        <button class="ink" @click="shoot">{{ t('Descargar postal', 'Download postcard') }}</button>
        <button @click="photo = false">{{ t('Volver', 'Back') }}</button>
        <small role="status">{{ notice }}</small>
      </div>

      <div v-if="album" class="veil">
        <section role="dialog" aria-modal="true" class="sheet album">
          <header class="sheet-head">
            <div class="sheet-badge" aria-hidden="true"><UiIcon name="album" :size="18" /></div>
            <div>
              <small>{{ name }}</small>
              <h2>{{ t('Mis postales', 'My postcards') }}</h2>
            </div>
          </header>
          <p v-if="!s.album.length">{{ t('La primera postal llega al conocer a tu vecino.', 'Meet your neighbour to collect your first postcard.') }}</p>
          <article v-for="c in s.album" :key="c.id">
            <small>{{ t('Día', 'Day') }} {{ c.day }} · {{ t(...titles[c.scene]) }}</small>
            <p>{{ t(c.es, c.en) }}</p>
          </article>
          <div class="sheet-actions">
            <button @click="album = false; photo = true; notice = ''">{{ t('Modo postal', 'Postcard mode') }}</button>
            <button class="ink" @click="album = false">{{ t('Cerrar', 'Close') }}</button>
          </div>
        </section>
      </div>

      <div v-if="mini" class="miniworld" role="group" :aria-label="t('Minijuego', 'Minigame')">
        <div class="minihelp">
          <b>{{ mini.kind === 'kite' ? t('Atrapa tres corrientes de aire', 'Catch three gusts') : t('Recoge las tres naranjas', 'Catch the three oranges') }}</b> · {{ mini.count }}/3
          <button @click="collect(true)">{{ t('Resolver sin perseguir', 'Finish without chasing') }}</button>
        </div>
        <KiteFlight v-if="mini.kind === 'kite'" :count="mini.count" :en="prefs.lang === 'en'" @catch="collect()" />
        <button
          v-else
          :key="mini.count"
          class="collectible"
          :aria-label="t('Recoger naranja', 'Catch orange')"
          :style="{ left: [25, 62, 44][mini.count] + '%', top: 74 + (mini.count % 2) * 8 + '%' }"
          @click="collect()"
        >
          <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true">
            <circle cx="18" cy="20" r="11.5" fill="#e6893a" stroke="#a6571f" stroke-width="1.6" />
            <circle cx="14.5" cy="16" r="3.4" fill="#ffc982" opacity=".7" />
            <path d="M18 8.5c.6-2.5 2-4 3.8-4.5" stroke="#6c5238" stroke-width="1.8" stroke-linecap="round" />
            <path d="M18.4 8.5c3.2-2.6 7-2.2 8.2.5-2.6 2.2-6 1.8-8.2-.5Z" fill="#6b965d" stroke="#456b3d" stroke-width="1.1" />
          </svg>
        </button>
      </div>
    </template>
  </main>
</template>
