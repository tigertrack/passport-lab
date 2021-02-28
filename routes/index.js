const routes = require('express').Router()
const { User } = require('../models')
const bcrypt = require('bcrypt')
const passport = require('passport')
const authenticate = require('../middleware/authenticate')
const api = require('./api')

routes.use('/api', api)

routes.get('/',authenticate.isAuthenticate , (req, res) => res.render('index', {user : req.user}))

routes.get('/login', authenticate.isGuest, (req, res) => res.render('login'))

routes.get('/register', authenticate.isGuest, (req, res) => res.render('register'))

routes.post('/register', async (req, res) => {
    const user = await User.register(req.body)
    console.log(user)
    res.redirect('/login')
})

routes.post('/login', passport.authenticate('local', {
    successRedirect : '/',
    failureRedirect: '/login'
}))

routes.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login')
})




module.exports = routes