# Fase 3: lenguaje visual oficial de Lector Legendario

## Dirección aprobada

- Construir la dirección **Legendary Mythic** sobre el producto existente.
- Paleta fija **Archivo nocturno**: fondo `#0B1220`, superficie `#1D2B3A`, aventura `#28756F`, recompensa `#C89B3C`, texto `#E9EDF0`.
- Tipografía fija: **Cormorant Garamond** en títulos y **Karla** en lectura e interfaz.
- Composición fija: **escenario protagonista** a la izquierda y controles/colección a la derecha.
- Sensación: videojuego de aventura literaria para 10–13 años; cinematográfico, misterioso y elegante, sin aspecto infantil o administrativo.

## Qué se construirá

### 1. Sistema visual global
- Convertir la paleta, rarezas, sombras, iluminación, marcos, superficies, espaciado y movimiento en variables reutilizables.
- Añadir fondos contextuales propios para el Bosque de las Palabras y un sistema preparado para cambiar de escenario por mundo.
- Cargar Cormorant Garamond y Karla correctamente, mejorar accesibilidad y respetar reducción de movimiento.

### 2. Componentes reutilizables
- Separar y reutilizar `CharacterCard`, `AvatarStage`, `ItemCard`, `RarityBadge`, `XPBar`, `RewardModal`, `WorldCard`, `WorldMap`, `AchievementCard`, `InventoryGrid` y `CategoryTabs`.
- Mantener `AvatarModular` como compositor técnico de capas; solo mejorar la representación visual de sus piezas y la integración física de la mochila.
- Conservar las referencias existentes de inventario y equipamiento; no guardar imágenes finales.

### 3. Experiencia del estudiante
- Rediseñar **Mi héroe** como ficha RPG con avatar dominante, escenario del bosque, nombre, clase, nivel, título, XP y progreso.
- Rediseñar `/personalizar` como pantalla dividida: escenario grande del héroe y colección de objetos con miniaturas, rareza, estado, descripción y condición.
- Convertir la Mochila del Explorador en el primer objeto especial, con marco raro, representación grande, brillo sutil e integración visible en el avatar.
- Rediseñar el modal de recompensa con aparición breve, objeto grande, acciones Equipar/Continuar y movimiento discreto.
- Transformar el mapa vertical en una ruta de aventura visual con los seis nombres oficiales, mundo actual destacado y bloqueos con nivel, XP faltante y barra.
- Crear navegación de juego coherente hacia Mi aventura, Mi héroe, Mapa, Insignias, Vestuario, Poderes y Progreso, sin inventar nuevas funciones ni rutas rotas.
- Añadir respuestas visuales breves para XP, nuevo nivel, insignia y objeto usando los resultados que ya produce la misión.

### 4. Coherencia del resto del MVP
- Aplicar el mismo lenguaje visual a acceso/registro, creación de héroe, lectura, retos, resultado y vista docente, sin cambiar su contenido ni comportamiento.
- Mantener una sola jerarquía clara, controles táctiles cómodos y el avatar como señal principal en pantallas pequeñas.
- Completar metadatos de las pantallas existentes sin cambiar navegación ni contenido funcional.

## Límites técnicos

- **Sin cambios de base de datos previstos.** No se tocarán tablas, políticas, datos, autenticación ni migraciones.
- No se modificarán fórmulas de XP, niveles, condiciones de insignias, lógica pedagógica, respuestas ni persistencia.
- No se crearán mundos funcionales, misiones, IA, tienda, ranking, pagos, chat ni aplicación móvil.
- Los fondos y ornamentos serán recursos locales optimizados; no se dependerá de imágenes externas en ejecución.

## Verificación

- Revisar visualmente escritorio (1280 px), tableta y teléfono, incluyendo desbordes, legibilidad, navegación y prioridad del avatar.
- Ejecutar el circuito estudiante existente: entrar/crear héroe → avatar inicial → personalizar/equipar → misión → cinco retos → XP → Ojo de Águila → Mochila del Explorador → equipar → salir → volver a entrar.
- Confirmar que XP, progreso, insignia, inventario y avatar equipado persisten y que la vista docente sigue consultando el progreso.
- Registrar cualquier limitación real sin avanzar a una fase posterior.
