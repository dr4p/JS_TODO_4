require('dotenv').config()
const express = require('express')
const { initDB } = require('./database');
const Task = require('./database/models/todo.model')
const PORT = process.env.PORT
const cors = require('cors')
const http = require("http");



const app = express()

app.use(cors())
app.use(express.json())

http.createServer(app).listen(PORT, () => {
    console.log('Server is working on port '+PORT)
})

initDB();


app.get("/todos", async (req, res) => {
    try {
        const todos = await Task.findAll();
        res.json({
            todos
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});

app.get("/todos/:id", async (req, res) => {
    try {
        const todo = await Task.findByPk(req.params.id);
        res.json({
            todo
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});


app.post("/todos", async (req, res) => {
    try {
        const todo = await Task.create({
            title : req.body.title,
            description : req.body.description
        })
        res.json({
            todo
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.patch("/todos/:id", async (req, res) => {
    try {
        const todo = await Task.findByPk(req.params.id);
        Task.update({
                title : req.body.title,
                description : req.body.description},
            {where : {id: req.params.id}});
        res.json({
            todo
        })
    }   catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.delete("/todos", async (req, res) => {
    try {
        const todos = await Task.findAll();
        for (let todo of todos) {
            await todo.destroy()

        }
        res.json({
            todos
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete("/todos/:id", async (req, res) => {
    try {
        const todo = await Task.findByPk(req.params.id);
        todo.destroy();
        res.json({
            todo
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});


