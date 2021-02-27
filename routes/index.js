const routes = require('express').Router()
const { User } = require('../models')
const bcrypt = require('bcrypt')

routes.get('/', (req, res) => res.render('index'))

routes.get('/login', (req, res) => res.render('login'))

routes.get('/register', (req, res) => res.render('register'))

routes.post('/register', async (req, res) => {
    let user = await User.create({
        username : req.body.username,
        password: await bcrypt.hash(req.body.password, 10)
    })
    console.log(user)
    res.redirect('/login')
})


module.exports = routes