const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io')
const cors = require('cors')
const port = 3001;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST'],
    }
});

io.on("connection", (socket) => {
    console.log(socket.id)
    socket.on("send-message", (data) => {
        socket.broadcast.emit("receive-message", data)
        console.log(data)
    })
    socket.on('disconnect', (data) => {
        console.log(socket.id)
    })
})

server.listen(process.env.PORT || port, () => {
    console.log('http://localhost:%d', port);
})