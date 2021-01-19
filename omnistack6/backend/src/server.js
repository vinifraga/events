// Importando o express
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


// Iniciando uma aplicação express
const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('connectRoom', (box) => {
    socket.join(box);
  });
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-c0gfc.mongodb.net/omnistack?retryWrites=true',
  {
    useNewUrlParser: true,
  });

app.use((req, res, next) => {
  req.io = io;

  return next();
});

// Assim como o get, ele age como um interceptador. Essa função
// vai permitir nos processarmos as requisições JSON, que é
// o formato mais recomendado (e utilizado nas REST APIs)

app.use(express.json());
// Mais um módulo que vai permitir o envio de arquivos, pois
// o JSON não suporta.


app.use(express.urlencoded({ extended: true }));
// Seta a porta que o servidor vai rodar.

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(process.env.PORT || 3333);
// Nesse momento rodei o comando node src\server.js e
// nada apareceu no terminal. Ao acesso pelo browser o end
// localhost:3333/teste e printa na tela Hello World
