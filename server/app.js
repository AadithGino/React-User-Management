const createError = require('http-errors');
const express = require('express');
const path = require('path'); 
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose")
const dotenv = require('dotenv')
dotenv.config();


const adminRouter = require('./routes/Admin/admin');
const usersRouter = require('./routes/User/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



mongoose.connect('mongodb://localhost:27017/NOTEAPP')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const cors = require('cors');
const { notfound, errorHandler } = require('./middleware/error');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use('/admin', adminRouter);
app.use('/', usersRouter);

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
  
});





app.use(notfound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`server running in port ${PORT} `))

module.exports = app;


