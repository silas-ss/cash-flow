const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')

let database = null

const loadModels = (sequelize) => {
  const dir = path.join(__dirname, '../models')
  let models = []
  fs.readdirSync(dir).forEach(file => {
    const modelPath = path.join(dir, file)
    const model = sequelize.import(modelPath)
    models[model.name] = model;
  })
  return models;
}

const config = {
  database: (process.env.NODE_ENV === 'test') ? process.env.DATABASE_TEST : process.env.DATABASE,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  params: {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    logging: false
  }
}

module.exports = (app) => {
  if (!database) {
    const sequelize = new Sequelize(config.database, config.username, config.password, config.params)
    const models = loadModels(sequelize)
    database = { sequelize, Sequelize, models}
    
    sequelize.sync().done(() => {
      return database
    })
  }

  return database
}