# Intervención visual controlada — Mi aventura

## Alcance
Transformar únicamente `/aventura` en una escena RPG 2D unificada, conservando el Bosque de las Palabras, el avatar modular y toda la funcionalidad actual.

## Cambios
- Reorganizar `AdventureStage` para que escenario, protagonista, sendero y misión formen una sola composición, sin columnas de tarjetas.
- Afinar `AvatarStage` para dar al héroe escala protagonista, sombra de contacto, luz ambiental y entrada sutil sin ocultar el bosque.
- Compactar `Encabezado`, Player HUD, misión, equipo y trofeos como capas HUD discretas; la misión seguirá siendo la acción principal.
- Ajustar estilos responsivos para preservar la jerarquía mundo → personaje → misión → progreso en escritorio, tableta y móvil.
- Mantener el mapa existente debajo de la escena sin rediseñar otras pantallas.

## Reutilización
Se reutilizarán `AdventureStage`, `AvatarStage`, `AvatarModular`, `XPBar`, `Encabezado`, `WorldMap`, `WorldCard`, `Button` y los datos ya conectados. No se crearán variantes V2 ni componentes paralelos.

## Límites técnicos
No se tocarán consultas, autenticación, backend, modelos de datos, rutas, XP, niveles, misiones, inventario, insignias, recompensas ni persistencia.

## Verificación
Revisar visualmente escritorio, tableta y móvil; comprobar ausencia de desbordes y confirmar que la acción de misión conserva su destino actual.
