const api = require('express').Router()
const { User } = require('../models')
api.get('/users', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

module.exports = api