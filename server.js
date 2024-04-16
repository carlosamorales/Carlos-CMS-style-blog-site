const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Require your sequelize connection from the relevant file
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({
  defaultLayout: 'main', // Use the 'main' layout as the default for all views
  // Add any custom helpers or other configuration options you might need here
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up session with Sequelize store
app.use(session({
  secret: 'super secret secret', // Use an environment variable for production
  store: new SequelizeStore({
    db: sequelize
  }),
  resave: false,
  saveUninitialized: true,
  cookie: {
    // You can set additional cookie options here, if needed
  }
}));

// Implement routes
// Require your routes from the 'controllers' directory
const homeRoutes = require('./controllers/homeRoutes');

// Use the imported homeRoutes
app.use(homeRoutes);

// Root route to render the 'home' view using the 'main' layout
app.get('/', (req, res) => {
  // Check if the user is logged in and pass that data to your template
  const loggedIn = req.session.loggedIn || false; // Fallback to 'false' if not set
  res.render('home', { loggedIn });
});

// Start the server and listen on the configured port
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
