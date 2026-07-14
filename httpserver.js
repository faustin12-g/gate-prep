const http = require('http')
const fs = require('fs')
const path = require('path')

const INPUT_FILE = path.join(__dirname, 'input.txt')
const OUTPUT_FILE = path.join(__dirname, 'out.txt')

const server = http.createServer((req, res)=>{
    if(req.method === 'GET')
    {
        const readStream = fs.createReadStream(INPUT_FILE, 'utf8')
         readStream.on('open', ()=>{
            res.writeHead(200, {'Content-Type': 'text/plain'})
         })
         readStream.on('error', ()=>{
            res.writeHead(404, {'Content-Type': 'plain/text'})
            res.end('input.txt not found')
         })
         readStream.pipe(res)
    }
    else if (req.method === 'POST'){
        const writeStream = fs.createWriteStream(OUTPUT_FILE)
        req.pipe(writeStream)

        writeStream.on('finish', ()=>{
            res.writeHead(200, {'Content-Type': 'text/plain'})
            res.end('Data written to output.txt')
        })
        writeStream.on('error', ()=>{
            res.writeHead(500,  {'Content-Type': 'text/plain'})
            res.end('Failed to write to the file')
        })
    }
    else{
        res.writeHead(405, {'Content-type': 'text/plain'})
        res.end('Method not allowed')
    }
})

server.listen(3000, ()=>{
    console.log(`HTTP File server running on port 3000`)
})