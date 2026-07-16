const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

app.use(express.json())

const AUTH_FILE = path.join(__dirname, 'auth.json')

function readUsers(){
    const data = fs.readFileSync(AUTH_FILE, 'utf8')
    return data ? JSON.parse(data) : []
}

function writeUsers(users)
{
    fs.writeFileSync(AUTH_FILE, JSON.stringify(users, null, 2))
}

app.post('/signup', (req, res)=>{
    const { username, password } = req.body
    const users = readUsers()

    users.push({username, password})
    writeUsers(users)
    res.status(201).json({message: 'User Created!'})
})
app.post('/login', (req, res)=>{
    const users = readUsers()
    const {username, password} = req.body
    const match = users.find(u=>u.username === username && u.password === password)
    if(match) res.status(200).send({message: 'logged in'})
    res.status(200).send({message: 'username or email is invalid!'})
})
app.listen(3000, ()=>{
    console.log('server is running on this port')
})