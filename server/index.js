import express from 'express';
import morgan from 'morgan';
import { Server as socketServer } from 'socket.io';
import http from 'http';
import cors from 'cors';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { port } from './config.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const server = http.createServer(app);
const io = new socketServer(server, {
    cors: {
        origin: 'http://localhost:3000',
    }
});


app.use(cors());
app.use(morgan('dev'));
io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('message', message => {
        console
        socket.broadcast.emit('message', {
            from : socket.id,
            body : message
        });
    });
});

app.use(express.static(join(__dirname, '../client/build')));

server.listen(port);
console.log('Server listening on port', port);