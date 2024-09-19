import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { initDBConnection } from './models/db.js';
import { corsMiddleware } from './middlewares/cors.js';
import { trainerRouter } from './routes/trainer.js';
import { pokemonRouter } from './routes/pokemon.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware y rutas
app.use(corsMiddleware()); // Usar el middleware de CORS
app.use(express.json());
app.disable('x-powered-by');

app.use('/trainer', trainerRouter);
app.use('/nurse', pokemonRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Centro Pokemon API');
});

// Inicializar la conexión a la base de datos
initDBConnection()
  .then((connection) => {
    app.set('dbConnection', connection); // Configurar la conexión en el app object

    // Crear el servidor HTTP y Socket.IO
    const server = http.createServer(app);
    const io = new Server(server, {
      cors: corsMiddleware
    });

    // Manejador de eventos de conexión de socket
    io.on('connection', (socket) => {
      console.log('Nurse connected');

      // Obtener la conexión de la base de datos desde el app object
      const dbConnection = app.get('dbConnection');

      // Escuchar cambios en la lista de turnos y actualizarlos en la base de datos
      socket.on('updateTurnsList', async (newTurnsList) => {
        try {
          await dbConnection.beginTransaction();

          for (const pokemon of newTurnsList) {
            const { id, turn } = pokemon;
            const query = 'UPDATE Pokemon SET turn = ? WHERE id = ?';
            await dbConnection.execute(query, [turn, id]);
          }

          await dbConnection.commit();
          io.emit('turnsListUpdated', newTurnsList);
        } catch (error) {
          await dbConnection.rollback();
          console.error('Error updating to the database:', error);
        }
      });

      socket.on('disconnect', () => {
        console.log('Nurse disconnected');
      });
    });

    // Iniciar el servidor
    server.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
