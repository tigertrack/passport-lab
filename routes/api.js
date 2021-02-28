const api = require('express').Router()
const { User } = require('../models')
const authenticate = require('../middleware/authenticate')

const format = user => {
    const {id, username} = user
    return {
        id,
        username,
        token : user.generateToken()
    }
}

api.post('/auth/login', async (req, res) => {
   try {
       const user = await User.authenticate({username, password} = req.body)
       res.json(format(user))
   } catch (error) {
       res.status(404).json({message : error})
   }
})

api.get('/users', authenticate.hasToken, async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

module.exports = api