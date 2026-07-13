const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

app.use(express.json())

const AUTH_FILE = path.join(__dirname, 'auth.json')