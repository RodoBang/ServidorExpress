const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Array para almacenar las tareas en memoria
let tareas = [];
let nextId = 1;

// Ruta para crear una nueva tarea
app.post('/tareas', (req, res) => {
    const { descripcion } = req.body;
    if (!descripcion) {
        return res.status(400).json({ error: "La descripción es obligatoria" });
    }
    const nuevaTarea = {
        id: nextId++,
        descripcion: descripcion,
        completada: false,
        fechaCreacion: new Date()
    };
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

// Ruta para leer todas las tareas
app.get('/tareas', (req, res) => {
    res.json(tareas);
});

// Ruta para leer una tarea específica por su ID
app.get('/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === id);

    if (!tarea) {
        return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.json(tarea);
});

// Ruta para actualizar una tarea
app.put('/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { descripcion, completada } = req.body;

    const tarea = tareas.find(t => t.id === id);
    if (!tarea) {
        return res.status(404).json({ error: "Tarea no encontrada" });
    }
    if (descripcion) {
        tarea.descripcion = descripcion;
    }
    if (completada !== undefined) {
        tarea.completada = completada;
    }

    res.json(tarea);
});

// Ruta para eliminar una tarea
app.delete('/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tareas.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Tarea no encontrada" });
    }
    tareas.splice(index, 1);
    res.status(204).send();
});

// Calcular estadísticas
app.get('/tareas/estadisticas', (req, res) => {
    console.log(tareas);  // Verifica el contenido de tareas
    const totalTareas = tareas.length;
    const completadas = tareas.filter(t => t.completada).length;
    const pendientes = totalTareas - completadas;

    if (totalTareas === 0) {
        return res.json({
            totalTareas,
            completadas,
            pendientes,
            tareaMasReciente: null,
            tareaMasAntigua: null
        });
    }

    const masReciente = tareas.reduce((reciente, tarea) => {
        return tarea.fechaCreacion > reciente.fechaCreacion ? tarea : reciente;
    });

    const masAntigua = tareas.reduce((antigua, tarea) => {
        return tarea.fechaCreacion < antigua.fechaCreacion ? tarea : antigua;
    });

    res.json({
        totalTareas,
        completadas,
        pendientes,
        tareaMasReciente: masReciente,
        tareaMasAntigua: masAntigua
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
