# A Better Mess

## Contexto y fuentes

A Better Mess es un cómic digital episódico, interactivo, lineal y autosuficiente. Blund y Puff viven en una comunidad que convirtió los residuos en hogares, herramientas y cultura. La llegada de la Orden Blanca y su operación de Limpieza plantean un conflicto entre la restauración ambiental y la pérdida de hogares, recursos e identidad. Conserva la ambigüedad de ambos mundos.

- Usa el [documento consolidado de A Better Mess](https://docs.google.com/document/d/1LwoZaEv7olqpDL7LYdupw4RT-9oAwnQWRz7kdL1_NPs/edit?tab=t.0#heading=h.u1hc2qqsgvrc) para el guion base, la continuidad y el estado de cada acontecimiento. Para el primero, consulta la sección «Guion aprobado como base» y la planificación visual refinada.
- Consulta la [propuesta de representación](https://docs.google.com/document/d/15q0Lf95XogpvyDJHQ_vslO0VGzZi29SxXf7FWWJ66Mo/edit?tab=t.wwwaxdsf9ver#heading=h.s0x531dx7f8m) para los encuadres y la división de páginas. Da prioridad al guion refinado del documento consolidado cuando difieran.
- Usa las fichas de personajes y escenarios como referencias de diseño. La tira monocromática orienta la tinta, las tramas y la rotulación. Conserva las siluetas, proporciones y accesorios de los personajes.

## Alcance inicial

- Construye primero un lector funcional para móvil y escritorio. Usa una muestra con arte provisional basada en tres viñetas del primer acontecimiento: V1, panorámica de Los Desparchados, V3, Blund descansando, y V4, la gotera con el «PLOC». Mantén sus identificadores y su orden del guion.
- El primer acontecimiento, «La vida cotidiana en un mundo de basura», tiene 6 páginas, 18 viñetas y 4 secuencias. La Orden Blanca entra en el segundo acontecimiento. Los acontecimientos 2 a 7 tienen tratamiento narrativo y su desarrollo por viñetas queda pendiente.
- Trata el diálogo del guion refinado como base de trabajo. Distingue los efectos sugeridos y el arte provisional del contenido aprobado para producción.

## Arquitectura del lector

- Separa los datos del guion, los componentes del lector y los efectos. Añadir, ordenar o editar una viñeta existente debe poder hacerse en el archivo del capítulo.
- Identifica los capítulos y las viñetas con identificadores estables. Guarda en el capítulo el orden de lectura, el tipo de viñeta, la ilustración y su descripción, y el texto por separado. Los recursos de animación y audio son opcionales por viñeta.
- Mantén la navegación principal en **Inicio** y **Capítulos**. Usa desplazamiento nativo, lectura vertical continua y orden de izquierda a derecha cuando haya viñetas en una fila. En móvil, apílalas conservando ese orden.
- En Inicio, deja que la portada dé paso a las viñetas en la misma página. Usa el catálogo de Capítulos como acceso directo. Activa el parallax solo en planos en los que la profundidad o la transición aporten al relato.
- Mantén los diálogos como texto legible y el relato completo disponible con el sonido apagado y con movimiento reducido. Activa el audio mediante una acción del lector y vincula el movimiento de las escenas al desplazamiento cuando corresponda.
- Conserva el manga en blanco y negro, con grises y tramas. Alterna panorámicas inmersivas con viñetas tradicionales y usa una interfaz neutra. Reserva `$frontend-design` para la etapa de pulido visual.
- Si el repositorio parte de cero, Astro y TypeScript son la propuesta inicial para un sitio estático. Si ya existe una base, respeta su tecnología y sus convenciones.

## Organización del proyecto

- `src/content/chapters/` contiene un archivo TypeScript por capítulo y su catálogo. Para una viñeta existente, edita el archivo del capítulo. El arreglo `rows` fija la secuencia de arriba abajo y cada fila fija el orden de izquierda a derecha. Una fila de una sola viñeta ocupa su propio tramo. Conserva los identificadores del guion y usa identificadores únicos dentro del capítulo.
- `src/content/types.ts` define los datos del capítulo y las viñetas. Cada viñeta guarda su tipo, dimensiones, descripción, texto y referencias opcionales a imagen, movimiento y audio. Omite `illustration.src` para mostrar un cuadro en blanco. Añade `parallax` a una ilustración para definir el punto de enfoque en escritorio y móvil. Usa `framing: 'detail'` para estrechar un plano detalle que tenga su propia fila. Conserva el texto narrativo en HTML generado desde estos datos.
- `src/components/reader/` renderiza las filas y las viñetas a partir de los datos. `src/effects/` contiene el movimiento y el control de sonido. `public/comic/` contiene el arte y el audio provisionales. Las rutas están en `src/pages/`. Los estilos generales están en `src/styles/site.css` y la composición y rotulación del lector en `src/styles/reader.css`.

## Verificación

- Ejecuta `npm ci` y `npm run dev`. Abre Inicio (`/`), Capítulos (`/capitulos/`) y el lector (`/capitulos/acontecimiento-1/`) en móvil y escritorio. Desde Inicio, desplázate de la portada a V1 → V3 → V4 sin cambiar de página. Comprueba el encuadre de V1 en ambos anchos y emula movimiento reducido para verla fija. Prueba los saltos de viñeta en la ruta directa, el regreso al comienzo, la legibilidad del diálogo y del «PLOC» y el foco con Tab. En PowerShell, puedes usar `npm.cmd` si la política local bloquea `npm.ps1`.
- Recorre V4 sin tocar «Escuchar gotera». La gota sigue el desplazamiento y el audio permanece en pausa. Activa el botón con Enter y comprueba que reproduce el sonido. Emula `prefers-reduced-motion: reduce` y repite la lectura para comprobar que la gota queda estática y el texto y el audio voluntario siguen disponibles.
- Para la prueba de una cuarta viñeta, añade temporalmente una copia de V3 al final de la fila de V4 en `src/content/chapters/acontecimiento-1.ts` con un identificador único, como `V-prueba`. Comprueba que Capítulos muestra cuatro viñetas y que V4 queda antes de la copia, a su izquierda en escritorio y encima en móvil. Retira la viñeta de prueba del archivo del capítulo al terminar.
- Ejecuta `npm run check` y `npm run build` para comprobar los tipos, las plantillas y la generación estática.
