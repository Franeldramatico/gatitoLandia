<script setup>
defineProps({t:Function,met:Boolean})
</script>
<template><section class="sheet directory"><small>VILLA BIGOTES · ↑ ↓</small><h2>{{ t('Directorio del ascensor','Lift directory') }}</h2>
<svg viewBox="0 0 320 180" role="img" :aria-label="t('Del pasillo al café por el almacén o el jardín','From the hall to the café via the shop or garden')"><path d="M65 90H160V33h83M160 90v55h85M65 90v55h95" fill="none" stroke="#96a48b" stroke-width="4"/>
<g v-for="([x,y,label],i) in [[65,90,t('Pasillo','Hall')],[160,33,t('Almacén','Shop')],[245,33,'Café'],[160,145,t('Jardín','Garden')],[245,145,'Café'],[65,145,t('Azotea','Roof')]]" :key="i"><circle :cx="x" :cy="y" r="8" :fill="i?'#809787':'#bd7557'"/><text :x="x" :y="y-13" text-anchor="middle" fill="#354b42" font-size="14">{{ label }}</text></g></svg>
<p>📍 {{ t('Estás aquí: pasillo.','You are here: hallway.') }} {{ met?t('Al café: pasillo → almacén → café.','Café: hallway → shop → café.'):t('Conoce a tu vecino para explorar el barrio.','Meet your neighbour to explore the area.') }}</p>
<button @click="$emit('close')">{{ t('Cerrar','Close') }}</button></section></template>
