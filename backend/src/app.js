import express from 'express'
import { corsMiddleware } from './middleware/cors.js'
import { pokemonRoutes } from './routes/pokemon.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(corsMiddleware())
app.use(json())
app.disable('x-powered-by')

app.use('/trainer', pokemonRoutes)
app.use('/nurse', pokemonRoutes)

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Centro Pokémon')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})