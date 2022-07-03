var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mongoose = require('mongoose')
// var logger = require('morgan');

var app = express();

// mongoDB database connection establish....
const databaseUrl = 'mongodb://localhost:27017/my_notes_list';

const database = mongoose.connect(databaseUrl);
database.then((db)=>{
   console.log("Successfully Connected to the database")
},(err)=>{
   console.log(err);
   throw err;
})

// sub-routes are applyied here......
var adminRouter = require('./routes/adminRouter');
var studentRouter = require('./routes/studentRouter');

//admin sub-route connected to here
app.use('/admin',adminRouter);
app.use('/student',studentRouter);



// view engine setup....
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// cors policies implementation
app.use(cors());


// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
