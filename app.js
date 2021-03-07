var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var path = require('path');
var app = express();

const helmet = require("helmet");

require('dotenv').config()

if(process.env.ENV == 'production') {
  let hidePoweredBy = require('hide-powered-by'); 
  app.use(hidePoweredBy());
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('port', process.env.PORT || 8000);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === process.env.ENV ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
