const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A client is connected');

    socket.on('message', (message) => {
        console.log('Message:', message);
        io.emit('message', message + ' from server');
    });

    socket.on('disconnect', () => {
        console.log('A client is disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});