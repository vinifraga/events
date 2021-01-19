const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');
// O get é para receber requisições, então o primeiro argumento
// /teste é o path. Nesse caso, será localhost/teste. O segundo
// argumento é uma função interessante que intercepta a requisição,
// onde posso fazer algo, ou não, e retornar a resposta
// O req armazena todas as informações da requisição (forms,
// campos de get, arquivos, etc)
// res representa a resposta que o cliente vai receber
routes.post('/boxes', BoxController.store);
routes.get('/boxes/:id', BoxController.show);
routes.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store);

module.exports = routes;
