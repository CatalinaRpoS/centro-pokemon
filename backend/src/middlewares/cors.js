import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'http://localhost:5500',
  'http://localhost:5173',
  'http://localhost:5174',
  'https://healmypokemons.vercel.app',
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (!origin || acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
})