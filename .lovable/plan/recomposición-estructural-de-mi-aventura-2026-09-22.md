# Recomposición estructural de Mi aventura

## Resultado
Convertir únicamente la escena principal de `/aventura` en una interfaz de RPG 2D donde el bosque ocupa el protagonismo y los datos dejan de presentarse como paneles independientes.

## Intervención
- Reescribir la estructura visual de `AdventureStage` como una sola escena cinematográfica.
- Sustituir el título grande por una identificación mínima de zona y mundo.
- Situar el avatar modular sobre una zona de suelo, ligeramente a la izquierda y con escala natural.
- Convertir la misión en un quest HUD estrecho, integrado a la derecha y conectado visualmente con el personaje.
- Reubicar nombre, nivel y XP en un HUD inferior compacto.
- Retirar de esta escena la fila de miniaturas de equipo; mantener acceso a Mochila y toda su funcionalidad mediante la navegación existente.
- Reducir trofeos/equipo a indicadores secundarios mínimos, sin tarjetas ni cuadrículas.
- Mantener el mapa sin cambios visuales ni funcionales.
- Adaptar la misma jerarquía a tableta y móvil sin convertirla en una lista de tarjetas.

## Reutilización y límites
Se reutilizarán `AdventureStage`, `AvatarStage`, `AvatarModular`, `XPBar`, `Encabezado`, `Button` y la navegación actual. No se crearán componentes paralelos ni se tocarán datos, consultas, autenticación, rutas, XP, misiones, progreso, inventario, insignias, recompensas o persistencia.

## Verificación
Revisar escritorio, tableta y móvil; comprobar el encuadre del personaje, ausencia de desbordes y funcionamiento del acceso a la misión.
