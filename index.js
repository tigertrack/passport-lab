const express = require('express')
const app = express()
const {PORT = 8000} = process.env

const routes = require('./routes')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(routes)

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`))