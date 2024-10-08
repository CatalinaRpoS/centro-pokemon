import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { getConnection } from './models/db.js';
import { corsMiddleware } from './middlewares/cors.js';
import { trainerRouter } from './routes/trainer.js';
import { pokemonRouter } from './routes/pokemon.js';
import { root } from './routes/root.js';

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(corsMiddleware());
app.use(express.json());
app.disable('x-powered-by');

app.use('/trainer', trainerRouter);
app.use('/nurse', pokemonRouter);
app.use('/',root);

app.get('/', (req, res) => {
  res.send('Welcome to the Centro Pokemon API');
});
 
io.on('connection', (socket) => {
  console.log('Nurse connected');

  socket.on('updateTurnsList', async (newTurnsList, removedPokemonId) => {
    const dbConnection = await getConnection();
    try {
      await dbConnection.beginTransaction();

      for (const pokemon of newTurnsList) {
        const { id, turn } = pokemon;
        const query = 'UPDATE Pokemon SET turn = ? WHERE id = ?';
        await dbConnection.query(query, [turn, id]);
      }

      if(removedPokemonId){
        const query = 'DELETE FROM Pokemon WHERE id = ?';
        await dbConnection.query(query, [removedPokemonId]);
      }

      await dbConnection.commit();
      io.emit('turnsListUpdated', newTurnsList);
    } catch (error) {
      await dbConnection.rollback();
      console.error('Error updating turns list:', error);
    } finally {
      dbConnection.release();
    }
  });

  socket.on('disconnect', () => {
    console.log('Nurse disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});