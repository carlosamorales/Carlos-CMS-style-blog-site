const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./config/connection'); // adjust path as needed
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ /* config */ });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up session with Sequelize store
app.use(session({
  secret: 'super secret secret',
  store: new SequelizeStore({
    db: sequelize
  }),
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

// Implement routes
app.use(require('./controllers/homeRoutes'));

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
