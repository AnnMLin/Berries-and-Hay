const createError = require('http-errors');
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser');
const logger = require('morgan')
const session = require('express-session')
const cookieSession = require('cookie-session')

const { userRouter, authRouter } = require('./routes')

const app = express();

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// SESSION MIDDLEWARE

// EXPRESS-SESSION
// app.use(session({
//   secret: 'PeachyPeaches',
//   resave: false,
//   saveUninitialized: true
// }))

// COOKIE-SESSION
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

// SESSION LOGGING MIDDLEWARE
app.use((req, res, next) => {
  console.log('SESSION:', req.session)
  next()
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/user', userRouter)
app.use('/auth', authRouter)

// PUBLIC PATH
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client/build')))
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client/build', 'index.html'))
  })
}
else {
  app.use(express.static(path.join(__dirname, 'public')))
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'))
  })
}




// CATCH 404 & FORWARD TO ERROR HANDLER
app.use(function(req, res, next) {
  next(createError(404));
});

// ERROR HANDLER
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // RENDER THE ERROR PAGE
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
