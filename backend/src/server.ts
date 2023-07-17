import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV}` });
import Logger from './core/Logger';
import { port } from './config';
import app from './app';
import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const userSockets = new Map();

io.on('connection', (socket) => {
  userSockets.set(socket.id, socket.id);
  console.log(
    'PRODUCTION SERVER: user connected, online user count:',
    userSockets.size,
  );

  socket.on('message', (message, callback) => {
    console.log('PRODUCTION SERVER: ', message);
    const { from: sourceSocketId, to: targetSocketId } = message;
    io.to(targetSocketId).emit('message', message);
    io.to(sourceSocketId).emit('message', message);
    if (callback) {
      callback({
        ok: true,
      });
    }
  });

  socket.on('online_user', () => {
    console.log('PRODUCTION SERVER: online_user');
    const onlineUsers = Array.from(userSockets.values());
    io.to(socket.id).emit('online_user', onlineUsers);
  });

  socket.on('disconnect', () => {
    userSockets.delete(socket.id);
    console.log(
      'PRODUCTION SERVER: user disconnected, online user count:',
      userSockets.size,
    );
  });
});

server
  .listen(port, () => {
    console.log(`server running on port : ${port}`);
    Logger.info(`server running on port : ${port}`);
  })
  .on('error', (e) => {
    console.log(e);
    Logger.error(e);
  });
