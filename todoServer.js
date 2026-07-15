const express = require('express')
const { stat } = require('fs/promises')
const app = express()
app.use(express.json())

let tasks = []
let nextId = 1

const VALID_STATUSES = ['todo', 'doing', 'done']

app.post('/todo', (req, res)=>{
    const { task, status = 'todo'} = req.body
    if(!task){
        return res.status(400).json({message:'task is required'})
    }
    if(!VALID_STATUSES.includes(status)){
        return res.status(400).json({message: `status must be one of ${VALID_STATUSES}`})
    }
    const newTask = {id: nextId, task, status}
    tasks.push(newTask)
    res.status(201).json(newTask)
})

app.get('/todo', (req, res)=>{
    const {status}=req.query
    if (status)
    {
        return res.json(tasks.filter(t=>t.status === status))
    }
    res.json(tasks)
})

app.get('todo/:id', (req, res)=>{
    const id = Number(req.params.id)
    const todo = tasks.find(t=>t.id===id)
    if(!todo)
    {
        return res.status(404).json({message: 'Todo not found'})

    }
    else{
        res.status(200).json({todo: todo})
    }
})


app.listen(3000, ()=>{
    console.log('listening on port 3000')
})