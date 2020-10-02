'use strict';

const http = require('http');

const hostname = '127.0.0.1';
const port = 3333;

const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const morgan = require('morgan');
const logger = morgan('tiny');
const helmet = require('helmet');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');

app.use(express.static('public'));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(logger);
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);

app.use(cookieParser());
app.use(
    session({
        secret: 'mySecret',
        resave: false,
        saveUninitialized: true,
        is_logged_in: false,
    })
);

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

const rootController = require('./routes/index'),
    imageController = require('./routes/image'),
    profileController = require('./routes/profile'),
    usersController = require('./routes/users'),
    searchController = require('./routes/search');

app.use('/', rootController);
app.use('/users', usersController);
app.use('/profile', profileController);
app.use('/image', imageController);
app.use('/search', searchController);
