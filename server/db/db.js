const Sequelize = require('sequelize')

const db = new Sequelize(`postgres://localhost:5432/berries_and_hay`, {logging: false})

module.exports = db

