1. Probar la Creación de Tareas
Envía una solicitud POST para crear una nueva tarea. 
*MÉTODO POST : http://localhost:3000/tareas
En el body> JSON : {
    "descripcion": "Hacer la compra"
}


2. Probar Leer Todas las Tareas
Envía una solicitud GET para leer todas las tareas.
*MÉTODO GET : http://localhost:3000/tareas

3. Probar Leer una Tarea Específica
Ruta: GET /tareas/:id

Reemplaza :id con el ID de la tarea que deseas leer.

*MÉTODO GET http://localhost:3000/tareas/1

4. Probar Actualizar una Tarea
Ruta: PUT /tareas/:id

Envía una solicitud PUT para actualizar la descripción o el estado de completada de una tarea.
*MÉTODO PUT : http://localhost:3000/tareas/1
En el body>json: 
{
    "descripcion": "Hacer la compra y limpiar",
    "completada": true
}

5. Probar Eliminar una Tarea
Ruta: DELETE /tareas/:id

Envía una solicitud DELETE para eliminar una tarea.
*MÉTODO DELETE : http://localhost:3000/tareas/1
