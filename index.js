const express = require('express')


const routes = require('./routes')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const localAuth = require('./auth/local-strategy')
const jwtAtuh = require('./auth/jwt-strategy')


const app = express()
const {PORT = 8000} = process.env 

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(flash())
app.use(session({
    secret: 'you-shall-not-pass',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(routes)

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`))