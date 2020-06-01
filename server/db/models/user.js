const Sequelize = require('sequelize')
const crypto = require('crypto')
const db = require('../db')

const User = db.define('user',
{
  name: { 
    type: Sequelize.STRING,
    allowNull: false
  },
  email: { 
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    }
  },
  balance: {
    type: Sequelize.DECIMAL(10,2),
    defaultValue: 5000.00
  }
})

module.exports = User

// CLASS METHODS
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

// HOOKS
const setSaltAndPassword = user => {
  if(user.changed('password')){
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(serSaltAndPassword) // FOR SEEDING
})

// INSTANCE METHODS
User.prototype.correctPassword = function(enteredPassword) {
  return User.encryptPassword(enteredPassword, this.salt()) === this.password()
}