const passport = require('passport')
const {Strategy : JwtStrategy, ExtractJwt} = require('passport-jwt')
const { User } = require('../models')
const user = require('../models/user')

const options = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey : 'this is my jwt secret'
}

passport.use(new JwtStrategy(options, async (payload, done) => {
   try {
        const user = User.findByPk(payload.id)
        done(null, user)
   } catch (error) {
        done(error, false)
   }
}))