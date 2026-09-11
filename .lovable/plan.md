# Fase 2 — Héroe y avatar 2D modular

## Objetivo
Integrar un avatar por capas y un inventario persistente sobre el MVP existente, sin alterar la lógica actual de registro, retos, XP, insignias ni progreso.

## Implementación
1. **Modelo de datos mínimo**
   - Crear un catálogo escalable de piezas con código, nombre, categoría, descripción, asset, rareza y condición de desbloqueo.
   - Crear el inventario por héroe con fecha de desbloqueo y estado equipado.
   - Proteger ambos con permisos: catálogo visible para estudiantes; cada estudiante solo administra el inventario de su propio héroe; docentes conservan únicamente la consulta necesaria.
   - Añadir una función segura que entregue el conjunto inicial al crear un héroe y que también complete ese conjunto para héroes existentes sin borrar ni reemplazar datos.
   - Añadir la Mochila del Explorador al catálogo y vincular su desbloqueo a la obtención de Ojo de Águila, manteniendo intacta la condición y lógica de esa insignia.

2. **Avatar visual por capas**
   - Crear un componente reutilizable que componga rostro, cabello, ojos, parte superior, parte inferior, zapatos, accesorio y efecto.
   - Usar assets 2D vectoriales locales por pieza, superpuestos en orden estable; la configuración persistida serán referencias a piezas, nunca una imagen final.
   - Sustituir el emblema por el avatar modular en “MI HÉROE”, conservando nombre, clase, nivel, título, XP, barra e insignias.

3. **Inventario y personalización**
   - Crear una pantalla protegida de personalización con vista previa grande y categorías Rostro, Cabello, Ojos, Ropa, Pantalón, Zapatos, Accesorios y Efectos.
   - Mostrar cada pieza como Bloqueada, Desbloqueada o Equipada, con rareza y condición.
   - Permitir equipar solo piezas desbloqueadas, actualizando inmediatamente la vista previa y guardando una sola pieza equipada por categoría.
   - Añadir accesos “PERSONALIZAR” y “VESTUARIO” desde “MI HÉROE”; ambos llevan al inventario con la categoría adecuada.

4. **Recompensa de misión**
   - Tras la finalización existente, detectar si se obtuvo o ya se posee Ojo de Águila y desbloquear idempotentemente la Mochila del Explorador.
   - Mostrar “¡NUEVA RECOMPENSA!” con nombre, rareza, descripción y acciones EQUIPAR / CONTINUAR solo cuando el objeto se desbloquea por primera vez.
   - Equipar desde el modal sin modificar XP, respuestas, progreso ni insignias.

5. **Verificación obligatoria**
   - Probar estudiante nuevo o existente: avatar inicial, categorías, estados y equipamiento.
   - Completar los cinco retos y confirmar XP, Ojo de Águila, desbloqueo y equipamiento de la Mochila.
   - Cerrar sesión, volver a entrar y comprobar que todas las capas equipadas persisten.
   - Revisar escritorio y móvil, errores de pantalla/consola y permisos de datos.

## Detalles técnicos
- Se crearán únicamente dos tablas nuevas: catálogo de piezas e inventario del héroe.
- El estado equipado se guarda en el inventario; una restricción garantiza una sola pieza equipada por categoría y héroe.
- Los assets iniciales serán SVG 2D propios y reemplazables, usando códigos estables como `face_01`, `hair_01` y `accessory_backpack_01`.
- La columna heredada `heroes.avatar` se conserva por compatibilidad, pero deja de ser la fuente visual principal.
