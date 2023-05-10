const express = require('express');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json());

server.use(express.json());

server.get("/tasks", (req, res) => {
    res.json({
        tasks
    })
})

let tasks = [
    {
        id: 1,
        name: "Comprar Leite",
        description: "Ir no mercado da esquina e comprar leite",
        isDone: false
    },

    {
        id: 2,
        name: "Comprar Pão",
        description: "Ir no mercado da esquina e comprar pão",
        isDone: true
    }
];


server.get('/tasks', (req, res) => {
    res.json(tasks);
  });

server.get("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find((task) => {
        return task.id === id;
    });
    res.json({
        task
    })
})

  
server.post('/tasks', (req, res) => {
    const task = req.body;
    const id = tasks.length + 1;
    task.id = id;
    tasks.push(task);
    res.status(201).json(task);
  });
  
server.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTask = req.body;
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks[index] = { ...updatedTask, id };
      res.json(tasks[index]);
    } else {
      res.status(404).send('Tarefa não encontrada');
    }
  });
  
server.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      res.sendStatus(204);
    } else {
      res.status(404).send('Tarefa não encontrada');
    }
  });

const port = 3000;
server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });