const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const viewRouter = require('./routes/view.router.js');
const { Server } = require('socket.io');

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`));

const io = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/', viewRouter);

let messages = [];
io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    socket.on('authenticate', () =>{
        socket.emit('messageLogs', messages);
    })
    socket.on('message', data => {
        messages.push(data);
        io.emit('messageLogs', messages)
    });

    socket.broadcast.emit('userConnected', {user: 'Nuevo usario conectado'});

})