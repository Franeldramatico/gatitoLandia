# Villa Bigotes · GatitoLandia

Un simulador narrativo hecho con Vue 3 y Vite. Franxito vive en el departamento 15 y Aranxita en el 18. La postal que elijas en la portada determina cómo llegas al edificio y cómo conoces al otro gato.

## Iniciar el proyecto

**Para jugar con doble clic:** abre `Villa Bigotes.html`. Es una edición portátil con los escenarios y los gatos incorporados. `npm run build` la regenera en la raíz y en `dist/`. Para continuar una partida de la web, usa la misma dirección y navegador en los que la guardaste, o importa su copia en la edición portátil.

Con Node.js compatible con Vite 7 (20.19+ o 22.12+) y npm, ejecuta desde la raíz:

```sh
npm ci
npm run dev
```

Abre la dirección que indique Vite. Para revisar la versión de producción, ejecuta `npm run build` y después `npm run preview`.

## Qué se puede jugar hoy

- **Franxito:** aterriza, busca alquiler, recibe la llave del 15 y puede llamar a la puerta del 18.
- **Aranxita:** llega de noche en tren, busca alquiler en su celular y ayuda a Franxito a recoger las naranjas de su bolsa rota.
- **Exploración:** mantén las flechas para caminar, combina dos para moverte en diagonal o toca el suelo para cambiar de posición. Los círculos sobre la escena permiten viajar, hablar e interactuar. Pulsa el globo para continuar una conversación.
- **Vida cotidiana:** decora el departamento en 12 pasos acumulativos —con su cama, alfombra, sofá, plantas, cuadros, estantes, luz y rincón de lectura— hasta completar la habitación. Cada gato conserva su propia decoración. Duerme para cambiar de día y comparte actividades en el jardín, el café y la azotea. La boda se desbloquea en el jardín al nivel 100.
- **Preferencias y guardado:** español e inglés, tamaño de lectura y volumen independiente de ambiente, voz y efectos. Cada gato tiene una partida local propia. Su postal muestra el día y el lugar; puedes continuarla o reiniciar solo esa ruta.

## Dónde editar

- `src/App.vue`: portada, controles, orientación de los gatos, globos y sonido.
- `src/useStory.js`: rutas, escenas, nodos interactivos, días, vínculo y guardado.
- `src/neighborhood.js` y `src/activities.js`: contenido de actividades y traducciones.
- `src/scene/Illustration.vue`: composición de los escenarios SVG. `PrintStudio.vue` reúne los materiales reutilizables y `Finishing.vue` añade detalles de cada lugar.
- `src/postales.css` y `src/living.css`: interfaz, cámara móvil, iluminación, enfoque y movimiento reducido.
- `src/KiteFlight.vue` y `src/soundscape.js`: control de la cometa y ambientes sonoros.
- `habitantes/`: poses transparentes de ambos protagonistas. Las poses de caminar tienen orientaciones originales opuestas.

## Controles, recuerdos y minijuegos

Estas funciones ya forman parte del juego. En móvil, desliza el paisaje para buscar un punto de interés. Al pulsarlo, el gato camina hasta él; una flecha permite cambiar de idea. La cámara sigue al protagonista sin estirar el dibujo. La nota de la puerta del vecino indica dónde encontrarlo; las actividades compartidas hacen avanzar la franja del día y dormir estrena una mañana nueva.

Las dos rutas recuerdan el primer encuentro en el **Álbum**. En la de Aranxita, vuelve al almacén después de recoger las naranjas. En la azotea puedes dirigir la cometa con flechas o con el dedo; los dos minijuegos tienen una alternativa sin precisión ni límite de tiempo.

### Comprobaciones

```sh
npx playwright install chromium
npm test
```

Las pruebas de navegador recorren la llegada y el primer encuentro de ambas rutas, verifican orientación y globos, y comprueban que dormir, cambiar de personaje y recargar mantienen cada guardado. Los casos de progresión ejercitan el álbum y los hitos hasta la boda.

## Edición del barrio: 15 mejoras jugables

**Recorrido recomendado:** conoce al vecino, lee el plano del ascensor y encuentra al otro gato para invitarlo a merendar. Siembra junto al sendero, deja un dibujo en el buzón y duerme. Al día siguiente hay una cita, una respuesta y una flor. Los días de lluvia, visita la azotea y busca refugio en el invernadero.

**Portabilidad:** selecciona una postal guardada → **Exportar copia**. En otro dispositivo, abre **Sonido e idioma → Importar copia** y comprueba el gato, el lugar y el día antes de confirmar. Para descargar una imagen de la escena, entra en **Álbum → Modo postal**, ajusta el encuadre y descarga el PNG.

**Instalación y modo sin red:** sirve `dist/` por HTTPS o usa `npm run build` y `npm run preview` en localhost. En ajustes, elige **Descargar para jugar sin red** y espera la confirmación. Después puedes recargar sin conexión e instalar desde el menú del navegador si admite aplicaciones web. La instalación del trabajador de caché está deshabilitada en desarrollo.

**Carga inicial:** la portada usa dos retratos WebP pequeños; las ilustraciones completas y las poses se solicitan al entrar al juego. En una medición local con Chromium, ventana de 390 × 844, caché fría y servidor de producción, los recursos iniciales distintos del documento pasaron de unos 116 kB a unos 66 kB. La descarga para jugar sin red es voluntaria.

### Contenido de la edición

1. **Plano ilustrado en el ascensor.** Destacar «estás aquí» y enseñar cómo llegar al café sin tener que probar todas las salidas.
2. **Invitaciones con respuesta.** Proponer «¿merendamos mañana?» y permitir que el vecino acepte o sugiera otra hora. Recordar la cita al despertar.
3. **Un jardín que crece.** Dejar la semilla plantada en un lugar reconocible y mostrar el brote al día siguiente. Poder regalar la primera flor.
4. **Escenas espejo.** Contar la misma noche desde ambos departamentos: uno oye una canción a través de la pared y el otro descubre quién la tarareaba.
5. **Gustos que se descubren.** Revelar preferencias mediante conversaciones; al pedir en el café, permitir recordar la bebida favorita sin convertirlo en un examen.
6. **Un buzón para cada puerta.** Enviar un dibujo o una nota sin coincidir en persona y encontrar una respuesta al volver a casa.
7. **Clima que cambia los planes.** Si llueve el día de la cometa, ofrecer refugio en el invernadero y una conversación exclusiva de ese desvío.
8. **Un paseo con obstáculos reales.** Definir caminos alrededor de mesas y macetas para que el gato no las atraviese al acercarse a un nodo.
9. **Actuación en los diálogos.** Dirigir la mirada al interlocutor y reservar gestos concretos para cada frase: orejas bajas ante la bolsa rota, cola levantada al reconocer al vecino.
10. **Visitas al departamento del otro.** Tras recibir una invitación, cruzar el pasillo y descubrir un objeto que cuente algo que el vecino aún no ha dicho.
11. **Rituales después de la boda.** Elegir los domingos entre desayunar en el 15 o cuidar las plantas del 18, con pequeñas historias propias de esa etapa.
12. **Modo postal.** Ocultar los controles, encuadrar a los gatos y descargar una imagen con el lugar y la fecha del juego.
13. **Copias portátiles de la partida.** Exportar una ruta e importarla en otro dispositivo, con vista previa del gato, el día y el lugar antes de reemplazar datos.
14. **Instalación y juego sin conexión.** Permitir añadir Villa Bigotes a la pantalla de inicio y continuar una ruta sin red después de descargar sus recursos.
15. **Portada ligera en móviles.** Cargar primero los dos retratos del menú y preparar las poses de la ruta elegida durante su escena de llegada. Comparar la transferencia inicial antes y después.
