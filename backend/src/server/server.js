import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import initDBConnection from '../models/db'; // Importa la función de conexión a la base de datos

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Inicializar la conexión a la base de datos
let connection;
initDBConnection()
  .then((dbConnection) => {
    connection = dbConnection;
    console.log('Conectado a la base de datos MySQL');
  })
  .catch((err) => {
    console.error('Error conectando a la base de datos:', err);
  });

// Manejador de eventos de conexión de socket
io.on('connection', (socket) => {
  console.log('Una enfermera se ha conectado');

  // Escuchar cambios en la lista de turnos y actualizarlos en la base de datos
  socket.on('updateTurnsList', async (newTurnsList) => {
    try {
      await connection.beginTransaction();

      for (const pokemon of newTurnsList) {
        const { id, turn } = pokemon;
        const query = 'UPDATE pokemons SET turn = ? WHERE id = ?';
        await connection.execute(query, [turn, id]);
      }

      await connection.commit();
      io.emit('turnsListUpdated', newTurnsList);
    } catch (error) {
      await connection.rollback();
      console.error('Error actualizando la base de datos:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Una enfermera se ha desconectado');
  });
});

server.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
