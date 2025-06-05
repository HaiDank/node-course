import createError from 'http-errors';
import express from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import './db/mongoose.js'
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import tasksRouter from './routes/tasks.js';
import 'dotenv/config'

var app = express();

// const maintainance = false
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(express.static(join(import.meta.dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(function(req,res,next) {
//   if(maintainance){
//     res.status(503).send('Server under maintainance')
//   } else {
//     next()
//   }
// })


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error 
  // = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

export default app;
