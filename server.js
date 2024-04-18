const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
mongoose.Promise = global.Promise;


mongoose.connect(env.MONGODB_URI)
.then(() => console.log('Conexión a MongoDB establecida.'))
.catch(err => console.error('Error al conectar con MongoDB:', err));

require('./config/passport.js')(passport);
app.set('port', process.env.PORT || 3000);


app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'mazeactions',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



require('./app/routes.js')(app, passport);
app.use(express.static(path.join(__dirname, './dist')));


app.get('*', (req, res) => {
  console.log('cualquier');
  res.sendFile(path.join(__dirname, './dist', 'index.html'));


});


app.listen(app.get('port'), () => {
  console.log('este es el backend en server on port ', app.get('port'));
});
