const express = require('express')
const app = express()

function requestLogger(req, res, next)
{
    const start = Date.now()

    res.on('finish',()=>{
        const duration = Date.now() - start
        const timestamp = new Date().toISOString()
        console.log(`[${timestamp} ${req.method} ${req.url} ${'-'} ${duration}ms]`)
    })
    next()
}

app.use(requestLogger)

app.get('/',()=>{
    res.json({message: 'Welcome to this app'})
})

app.get('/users', (req, res)=>{
    res.json({users: ['Alice', 'Bob', 'Charlie']})
})



const PORT = 3000
app.listen(PORT,()=>{
    console.log('app listeninng on', PORT)
})