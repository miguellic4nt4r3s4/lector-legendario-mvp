# Mejora del personaje principal — Lector Legendario

## Objetivo
Convertir el avatar modular actual en un protagonista 2D de RPG de aventura, coherente con el Bosque de las Palabras, conservando intactos inventario, equipamiento, persistencia y todo el circuito educativo.

## Qué se construirá
1. **Nuevo cuerpo base modular**
   - Redibujar el personaje con una silueta estilizada y reconocible: cabeza, cuello, hombros, torso, brazos en pose de exploración, manos simplificadas, piernas y zapatos.
   - Mantener el mismo lienzo y los mismos códigos persistidos (`face_01`, `hair_01`, etc.), para que ninguna configuración guardada deje de funcionar.
   - Separar internamente las capas en piezas visuales reutilizables, con orden estable y puntos de anclaje compartidos.

2. **Conjunto visual mínimo de calidad**
   - Mejorar el rostro base con rasgos preparados para futuras expresiones.
   - Redibujar ojos y cabello con volumen, contorno y luces coherentes.
   - Convertir ropa, pantalón y zapatos iniciales en un Traje del Explorador con costuras, cuello, cinturón y detalles de aventura.
   - Conservar y mejorar las variantes existentes sin retirar objetos ya disponibles o bloqueados.
   - Crear un efecto ambiental sutil compatible con el personaje y el bosque.

3. **Mochila integrada físicamente**
   - Redibujar `accessory_backpack_01` con cuerpo, correas y volumen alineados a hombros y torso.
   - Mantenerla como capa equipable/desequipable y detrás del cuerpo donde corresponda, sin cambiar su desbloqueo ni persistencia.

4. **Integración con el escenario**
   - Añadir contorno consistente, luz de borde, sombra de contacto y profundidad ambiental al personaje.
   - Ajustar su escala y posición en Mi Héroe y Personalizar para que sea el foco visual tanto en escritorio como en móvil.
   - Mantener las miniaturas del inventario claras, incluso en objetos bloqueados, y mostrar la condición existente sin cambiar la lógica.

5. **Presentación oficial del Mundo 1**
   - Mostrar por separado `MUNDO 1` y `BOSQUE DE LAS PALABRAS`.
   - Cambiar únicamente la etiqueta visual de competencia a `LOCALIZACIÓN DE INFORMACIÓN`.
   - Ajustar la narrativa descriptiva para hablar de encontrar información, pistas y detalles relevantes, sin tocar progresión, misión ni recompensas.

## Límites técnicos
- Sin cambios en Lovable Cloud, tablas, permisos, autenticación, XP, niveles, misiones, retos, insignias, inventario ni persistencia.
- El avatar seguirá siendo una composición de ocho categorías independientes: Rostro, Cabello, Ojos, Ropa, Pantalón, Zapatos, Accesorios y Efectos.
- No se generará una imagen única ni una colección masiva de objetos; se mejorará el conjunto mínimo y las variantes ya existentes.
- La estructura quedará preparada para añadir nuevas piezas y expresiones mediante códigos estables, sin modificar el modelo de datos.

## Verificación
- Revisar visualmente Mi Aventura, Mi Héroe y Personalizar en escritorio, tableta y teléfono.
- Confirmar cambio inmediato al equipar una pieza y claridad de objetos bloqueados.
- Ejecutar el flujo obligatorio: Mi Aventura → Mi Héroe → Personalizar → cambiar pieza → equipar Mochila → volver → cerrar sesión → iniciar sesión → comprobar persistencia.
- Confirmar ausencia de errores visibles y que XP, niveles, misión, retos, insignias y progreso permanecen sin cambios.
