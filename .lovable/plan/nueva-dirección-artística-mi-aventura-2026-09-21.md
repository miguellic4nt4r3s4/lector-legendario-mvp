# Nueva dirección artística — Mi aventura

## Resultado

Convertir exclusivamente **Mi aventura** en una pantalla de videojuego 2D: el Bosque de las Palabras ocupará el primer plano visual, el héroe aparecerá integrado y dominante, y la misión será la acción principal. La información restante funcionará como HUD, no como un tablero de tarjetas.

## Composición

- Usar `bosque-palabras-stage.jpg` como escenario continuo, a gran escala y con profundidad mediante iluminación ambiental, niebla baja, sombra de contacto y partículas discretas.
- Situar al héroe de cuerpo completo dentro del entorno, con mayor tamaño y sin marco o tarjeta.
- Convertir la ficha del jugador en un HUD compacto superpuesto: nivel, nombre, clase y barra de XP.
- Dar a la misión actual una presencia secundaria fuerte, con título, descripción breve, XP y botón **CONTINUAR AVENTURA**.
- Mostrar el equipo como slots de RPG y las insignias como trofeos superpuestos, reduciendo textos y eliminando cajas innecesarias.
- Simplificar la navegación del estudiante a cinco destinos: **Aventura, Héroe, Mochila, Insignias y Mapa**; conservar la salida sin competir visualmente.

## Mapa del Reino

- Reutilizar `WorldMap` y transformar `WorldCard` en nodos visuales de una ruta ilustrada, no tarjetas apiladas.
- Mantener los seis mundos oficiales, sus estados, niveles, XP faltante y reglas actuales.
- Crear un recorrido Bosque → Desierto → Fortaleza → Ciudad → Archivo → Reino, con sendero, hitos diferenciados, candados y progreso.

## Implementación técnica

- Transformar `AdventureStage`, `Encabezado`, `WorldMap` y `WorldCard`; reutilizar `AvatarModular`, `XPBar`, `RarityBadge` y los datos existentes.
- Ajustar solamente estilos globales necesarios para escena, HUD, partículas, rutas y microinteracciones.
- Mantener `TarjetaHeroe`, `CharacterCard`, `Insignia`, `InventoryGrid` y demás pantallas sin rediseñarlas en esta tarea.
- No crear sistemas paralelos ni modificar Lovable Cloud, autenticación, datos, XP, niveles, misiones, retos, inventario, insignias, recompensas o persistencia.

## Adaptación y verificación

- Escritorio/portátil: escena amplia con héroe dominante, HUD lateral y misión destacada.
- Tableta/móvil: escena vertical; héroe continúa dominando y los controles se reubican sin miniaturizarse.
- Verificar ausencia de desbordamientos, legibilidad, navegación, acceso a misión, estados de equipo/trofeos y recorrido del mapa.
- Confirmar que no se modificó ninguna regla ni dato persistente.
