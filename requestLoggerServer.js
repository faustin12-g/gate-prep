const express = require('express')

const app = express()

function reqLogger(req, res, next)
{
    const start = Date.now()
    res.on('finish', ()=>{
        const duration = Date.now() - start
        const timestamp = new Date().toISOString()
        console.log([`${timestamp} ${req.method} ${req.url} - ${duration}ms`])
    })
    next()
}

app.use(reqLogger)

app.get('/',(req, res)=>{
    res.json({message: 'welcome'})
})

app.get()


app.listen(3000, ()=>{
    console.log('listening on port')
})