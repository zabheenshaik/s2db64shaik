var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const connectionString = "mongodb+srv://demo:demo@cluster0.ns5yk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose = require('mongoose');
mongoose.connect(connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pizzaRouter = require('./routes/pizza');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
var pizza = require('./models/pizza');
var resourceRouter = require('./routes/resource');
var app = express();

/// We can seed the collection if needed on server start
async function recreateDB() {
  // Delete everything in Pizza
    await pizza.deleteMany();
  
    let instance1 = new pizza({ pizza_flavour: "Pineapple", pizza_color: 'Black', pizza_cost: 750 });
    instance1.save(function (err, doc) {
      if (err) return console.error(err);
      console.log("First object saved in pizza")
    });
  
    let instance2 = new pizza({ pizza_flavour: "Bluberry", pizza_color: 'Light White', pizza_cost: 450 });
    instance2.save(function (err, doc) {
      if (err) return console.error(err);
      console.log("Second object saved in pizza")
    });
  
    let instance3 = new pizza({ pizza_flavour: "Chikki", pizza_color: 'Mixed', pizza_cost: 1000 });
    instance3.save(function (err, doc) {
      if (err) return console.error(err);
      console.log("Third object saved in pizza")
    });
  }
  let reseed = true;
  if (reseed) { recreateDB(); }

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/addmods', addmodsRouter);
app.use('/selector', selectorRouter)
app.use('/resource', resourceRouter);
app.use('/pizza', pizzaRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function () { console.log("Connection to DB succeeded") });