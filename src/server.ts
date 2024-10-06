import express from 'express'
import { initPresentationLayer } from './routes'

require('dotenv').config()
console.log('Starting application')

const app = express()
app.use(express.json());

initPresentationLayer(app)

const port = 3000
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
