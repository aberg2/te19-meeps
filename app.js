const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const app = express();
const nunjucks = require('nunjucks')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const meepsRouter = require('./routes/meeps');

require('dotenv').config();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/meeps', meepsRouter);


module.exports = app;
