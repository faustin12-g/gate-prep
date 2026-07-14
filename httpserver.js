const http = require('http')
const path = require('path')
const fs = require('fs')

const INPUT_FILE = path.join(__dirname, 'input.txt')
const OUTPUT_FILE = path.join(__dirname, 'output.txt')


const server = http.createServer((req, res)=>{
    if(req.method === 'GET')
    {
        const readStream = fs.createReadStream(INPUT_FILE, 'utf8')

        readStream.on('open', ()=>{
            res.writeHead(200, {'Content-Type': 'text/plain'})
        })
        readStream.on('error', ()=>{
            res.writeHead(404, {'Content-Type': 'text/plain'})
            res.end('input.txt not found')
        })
        readStream.pipe(res)
    }
    else if(req.method === 'POST')
    {
        const writeStream = fs.createWriteStream(OUTPUT_FILE)

        req.pipe(writeStream)

        writeStream.on('finish', ()=>{
            res.writeHead(500, { 'Content-Type': 'text/plain'})
            res.end('Date written to input.txt')
        })
        writeStream.on('error', ()=>{
            res.writeHead(500, {'Content-Type': 'text/plain'})
            res.end('Failed to post data')
        })
    }
    else{
        res.writeHead(405, {'Content-Type': 'text/plain'})
        res.end('Method not allowed')
    }
})

const PORT = 3000
server.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`)
})