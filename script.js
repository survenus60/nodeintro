const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

let tasks = [];

// Route POST pour créer une tâche
app.post("/tasks", (req, res) => {
    const { title, description, dueDate, status } = req.body;

    if (!title || !status) {
        return res.status(400).json({ error: "Title and status are required" });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        description: description || "",
        dueDate: dueDate || null,
        status
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const task = tasks.find(t => t.id === parseInt(taskId));

    if (!task) {
        return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    res.json(task);
});

app.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;

    const taskIndex = tasks.findIndex(t => t.id === parseInt(taskId));
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    res.json(tasks[taskIndex]);
});


app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    const deletedTask = tasks.splice(taskIndex, 1);
    res.json({ message: 'Tâche supprimée', task: deletedTask[0] });
})


app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});










