if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
};

// const bootstrap = require('bootstrap');
// const popper = require('popper.js');
const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const indexRoutes = require('./routes/index');
const session = require('express-session');
const app = express();

const secret = process.env.SECRET;
const sessionConfig = {
//   store: store,
  name: 'session',
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session(sessionConfig));
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRoutes);

app.listen(3000, () => {
  console.log('SERVING VIA PORT 3000!');
});
