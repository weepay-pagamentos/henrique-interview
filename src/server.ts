import express from 'express'

console.log('Starting application')

const app = express()

// TODO - inicializar camada de apresentação que contém a configuração dos endpoints
// initPresentationLayer(app)

const port = 3000
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
