const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const { isObject } = require('util');
const app = express();

const server = http.createServer(app);
app.use(express.static(path.join(__dirname, 'public')));
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('draw', ({ x, y, size, color }) => {
        socket.broadcast.emit('draw', {x,y,size, color});
    })
})
const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`server is running on port: ${PORT}`));