const express = require('express');
const logger = require('morgan');
const { connect } = require('./app/config/config');

const bookRouter = require('./app/api/routes/book.routes');
const bookShopRouter = require('./app/api/routes/bookshop.routes');
const userRouter = require('./app/api/routes/user.routes');

const { PORT, SECRET_SESSION } = require('./app/config/config');
const httpStatusCode = require('./app/utils/httpStatusCode');
const cors = require('cors');
connect();

const server = express();



server.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

server.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    credentials: true
}))

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(logger('dev'));

server.use('/books', bookRouter);
server.use('/bookshops', bookShopRouter);
server.use('/users', userRouter);

server.use( '*', (req, res, next) => {
    let err = new Error();
    err.status = 404;
    err.message = httpStatusCode[404];
    next(err);
})

server.set("secretKey", SECRET_SESSION);

server.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || 'Error inesperado del servidor');
})

server.disable('x-powered-by');

server.listen(PORT, () => {
    console.log(`Servidor arrancado en puerto ${PORT}`)
})