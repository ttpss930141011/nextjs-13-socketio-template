import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV}` });
import Logger from './core/Logger';
import { corsUrl, port } from './config';
import app from './app';
import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: corsUrl,
  },
});

const onlineUsers = new Map<string, string>();
let isEmitting = false;
let sendOnlineUsers: NodeJS.Timeout;

io.on('connection', (socket) => {
  console.log(
    'PRODUCTION SERVER: user connected, online user count:',
    onlineUsers.size,
  );

  socket.on('join', (data) => {
    const { socketId, name = socketId } = data;
    onlineUsers.set(socketId, name);
    // console.log(
    //   'PRODUCTION SERVER: user joined, online user count:',
    //   'socketId: ',
    //   socketId,
    //   'name: ',
    //   name,
    // );
  });

  socket.on('broadcast', (broadcast, callback) => {
    console.log('PRODUCTION SERVER: Broadcast ', broadcast);
    io.emit('broadcast', broadcast);
    if (callback) {
      callback({
        ok: true,
      });
    }
  });

  socket.on('private_message', (message, callback) => {
    console.log('PRODUCTION SERVER: ', message);
    const { from: sourceSocketId, to: targetSocketId } = message;
    io.to(targetSocketId).emit('private_message', message);
    io.to(sourceSocketId).emit('private_message', message);
    if (callback) {
      callback({
        ok: true,
      });
    }
  });

  socket.on('disconnect', () => {
    onlineUsers.delete(socket.id);
    console.log(
      'PRODUCTION SERVER: user disconnected, online user count:',
      onlineUsers.size,
    );
    if (isEmitting && onlineUsers.size === 0) {
      clearInterval(sendOnlineUsers);
      isEmitting = false;
    }
  });

  if (!isEmitting) {
    sendOnlineUsers = setInterval(
      () => io.emit('online_user', Object.fromEntries(onlineUsers)),
      5000,
    );
    isEmitting = true;
  }
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
