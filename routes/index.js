const routes = require('express').Router()
const { User } = require('../models')
const bcrypt = require('bcrypt')
const passport = require('passport')

routes.get('/', (req, res) => res.render('index'))

routes.get('/login', (req, res) => res.render('login'))

routes.get('/register', (req, res) => res.render('register'))

routes.post('/register', async (req, res) => {
    const user = await User.register(req.body)
    console.log(user)
    res.redirect('/login')
})

routes.post('/login', passport.authenticate('local', {
    successRedirect : '/',
    failureRedirect: '/login'
}))




module.exports = routes