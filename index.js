require('dotenv').config()
const { checkConnection, syncModels } = require('./database/index')
const addRelationsToModels = require('./database/relations')

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

async function checkAndSyncPostgreSQL() {
  await checkConnection()
  addRelationsToModels()
  await syncModels()
}

function initializeAndListenWithExpress() {
  const app = express()
    .use(cors())
    .use(morgan('dev'))
    .use(express.json())
    .use('/api', require('./api/routes'))

    .listen(process.env.PORT, () => {
      console.log(`> Listening on port: ${process.env.PORT}`)
    })
}

async function startAPI() {
  await checkAndSyncPostgreSQL()
  initializeAndListenWithExpress()
}

startAPI()
