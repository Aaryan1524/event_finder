import { createServer } from 'http';
import { Server } from 'socket.io';
import mysql from 'mysql2/promise';

const server = createServer();
const io = new Server(server);

const pool = mysql.createPool({
    host: 'socket-server-db',
    user: 'socket',
    database: 'messages',
    password: process.env.MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 5,
    enableKeepAlive: true
});

io.on('connection', async socket => {
    const id = socket.id;
    console.log(`Client connected: ${id}`);
    socket.broadcast.emit('join', { id });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${id}`);
        io.emit('leave', { id });
    });

    socket.on('message', async msg => {
        socket.broadcast.emit('message', msg);
        const { id, message } = msg;
        try {
            await pool.query(
                'INSERT INTO message_history VALUES (?, ?, NOW())',
                [ id, message ]
            );
        } catch (err) {
            console.error(`Error writing to database: ${err}`);
        }
    });
});

server.listen(8080);
console.log('socket.io server listening on 8080!');