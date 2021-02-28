'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
const e = require('express');
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static #encrypt = async (password) => await bcrypt.hash(password, 10)

    static associate(models) {
      // define association here
    }

    static register = async ({username, password}) =>{
      console.log(this.#encrypt(password))
      return this.create({
        username: username,
        password: await this.#encrypt(password)
      })
    }

    validatePassword = (password) => bcrypt.compare(password, this.password)

    generateToken = () => {
      const payload = {
        id: this.id,
        username: this.username
      }

      const secret = 'this is my jwt secret'

      const token = jwt.sign(payload, secret, {expiresIn: '1d'})

      return token
    }

    static authenticate = async({username, password}) => {
      try {
        const user = await this.findOne({where : {username}})
        if (!user) return Promise.reject("User not found")
        const isPasswordValid = await user.validatePassword(password)
        if(!isPasswordValid) return Promise.reject("Password did not match!")
        return Promise.resolve(user)
      } catch (error) {
        return Promise.reject(error)
      }
    }
    

    
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};