const express = require('express')
const routes = require('./routes')
const db = require('./config/configDB')
require('dotenv').config();

const app = express()
const port = 3000
db();

routes(app)

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))

module.exports = app