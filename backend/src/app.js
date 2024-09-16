import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { trainerRouter } from './routes/trainer.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(corsMiddleware())
app.use(json())
app.disable('x-powered-by')

app.use('/trainer', trainerRouter)
// app.use('/nurse', pokemonRouter)

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Centro Pokémon')
})

app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto http://localhost:${PORT}`)
})