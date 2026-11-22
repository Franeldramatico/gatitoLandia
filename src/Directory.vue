<script setup>
import UiIcon from './components/UiIcon.vue'

defineProps({ t: Function, met: Boolean })
</script>

<template>
  <section class="sheet directory">
    <header class="sheet-head">
      <div class="sheet-badge" aria-hidden="true"><UiIcon name="map" :size="18" /></div>
      <div>
        <small>VILLA BIGOTES · {{ t('DIRECTORIO', 'DIRECTORY') }}</small>
        <h2>{{ t('Directorio del ascensor', 'Lift directory') }}</h2>
      </div>
    </header>

    <svg
      viewBox="0 0 340 206"
      role="img"
      :aria-label="t('Del pasillo al café por el almacén o el jardín', 'From the hall to the café via the shop or garden')"
    >
      <defs>
        <pattern id="dirGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0v20" fill="none" stroke="#c8d0be" stroke-width=".65" opacity=".7" />
        </pattern>
        <pattern id="dirSubGrid" width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M5 0H0v5" fill="none" stroke="#dad3bd" stroke-width=".35" opacity=".5" />
        </pattern>
      </defs>
      <rect width="340" height="206" rx="10" fill="#f7f1df" />
      <rect width="340" height="206" rx="10" fill="url(#dirSubGrid)" />
      <rect width="340" height="206" rx="10" fill="url(#dirGrid)" />
      <rect x="6" y="6" width="328" height="194" rx="7" fill="none" stroke="#9aa899" stroke-width="1" stroke-dasharray="4 3" opacity=".7" />

      <!-- Blueprint Compass Watermark -->
      <g transform="translate(306 28)" stroke="#8fa093" fill="none" opacity=".6">
        <circle r="11" stroke-width=".9" />
        <path d="M0-14v28M-14 0h28" stroke-width=".8" />
        <path d="M0-11 3-3 0-5-3-3Z" fill="#b96d54" stroke="none" />
      </g>

      <!-- Connecting Route Paths -->
      <path
        d="M72 96H172V44h94M172 96v56h94M72 96v56h100"
        fill="none"
        stroke="#8aa090"
        stroke-width="3.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M72 96H172V44h94"
        fill="none"
        stroke="#b96d54"
        stroke-width="2"
        stroke-dasharray="5 4"
        stroke-linecap="round"
        opacity=".78"
      />

      <!-- Hallway (Current Location — Miniature Villa Archway) -->
      <g transform="translate(72 96)">
        <circle r="18" fill="#b96d54" fill-opacity=".18" />
        <circle r="12" fill="#b96d54" stroke="#fff7e6" stroke-width="2.5" />
        <path d="M-4 4v-6l4-3.5 4 3.5v6h-2.5v-3h-3v3Z" fill="#fff7e6" />
        <text y="-22" text-anchor="middle" fill="#2c443c" font-size="12" font-weight="700">
          {{ t('Pasillo', 'Hall') }}
        </text>
      </g>

      <!-- Shop (Miniature Awning) -->
      <g transform="translate(172 44)">
        <circle r="11.5" fill="#6d8c7c" stroke="#fff7e6" stroke-width="2.5" />
        <path d="M-5-2h10l1 4H-6Z" fill="#fff7e6" />
        <path d="M-3-2h3v4h-3Zm6 0h2v4h-2Z" fill="#b96d54" opacity=".8" />
        <text y="-17" text-anchor="middle" fill="#2c443c" font-size="12" font-weight="600">
          {{ t('Almacén', 'Shop') }}
        </text>
      </g>

      <!-- Café (Top — Steaming Espresso Cup) -->
      <g transform="translate(266 44)">
        <circle r="11.5" fill="#6d8c7c" stroke="#fff7e6" stroke-width="2.5" />
        <rect x="-4.5" y="-2" width="7.5" height="5.5" rx="1.5" fill="#fff7e6" />
        <path d="M3-1a2 2 0 0 1 0 3.5" fill="none" stroke="#fff7e6" stroke-width="1.2" />
        <path d="M-2-4v-2m3 2v-2" stroke="#fff7e6" stroke-width="1" stroke-linecap="round" />
        <text y="-17" text-anchor="middle" fill="#2c443c" font-size="12" font-weight="600">Café</text>
      </g>

      <!-- Garden (Miniature Tree & Blossom) -->
      <g transform="translate(172 152)">
        <circle r="11.5" fill="#6d8c7c" stroke="#fff7e6" stroke-width="2.5" />
        <path d="M0 4V-1" stroke="#fff7e6" stroke-width="1.4" />
        <circle cy="-2.5" r="4" fill="#fff7e6" />
        <circle cx="-1" cy="-3" r="1.2" fill="#b96d54" />
        <text y="25" text-anchor="middle" fill="#2c443c" font-size="12" font-weight="600">
          {{ t('Jardín', 'Garden') }}
        </text>
      </g>

      <!-- Café (Bottom — Steaming Cup) -->
      <g transform="translate(266 152)">
        <circle r="11.5" fill="#6d8c7c" stroke="#fff7e6" stroke-width="2.5" />
        <rect x="-4.5" y="-2" width="7.5" height="5.5" rx="1.5" fill="#fff7e6" />
        <path d="M3-1a2 2 0 0 1 0 3.5" fill="none" stroke="#fff7e6" stroke-width="1.2" />
        <text y="25" text-anchor="middle" fill="#2c443c" font-size="12" font-weight="600">Café</text>
      </g>

      <!-- Rooftop (Starry Terrace Lantern) -->
      <g transform="translate(72 152)">
        <circle r="11.5" fill="#6d8c7c" stroke="#fff7e6" stroke-width="2.5" />
        <path d="M0-5 1.4-1.4 5 0 1.4 1.4 0 5-1.4 1.4-5 0-1.4-1.4Z" fill="#fff7e6" />
        <text y="25" text-anchor="middle" fill="#2c443c" font-size="12" font-weight="600">
          {{ t('Azotea', 'Roof') }}
        </text>
      </g>
    </svg>

    <p class="dir-note">
      <UiIcon name="pin" :size="16" />
      <span>
        {{ t('Estás aquí: pasillo.', 'You are here: hallway.') }}
        {{
          met
            ? t('Al café: pasillo → almacén → café.', 'Café: hallway → shop → café.')
            : t('Conoce a tu vecino para explorar el barrio.', 'Meet your neighbour to explore the area.')
        }}
      </span>
    </p>
    <button class="ink" @click="$emit('close')">{{ t('Cerrar', 'Close') }}</button>
  </section>
</template>

<style scoped>
.dir-note {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  line-height: 1.45;
  margin: 14px 0 18px;
}
.dir-note :deep(.ui-icon) {
  color: #b96d54;
  margin-top: 2px;
}
</style>
