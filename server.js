// dependencies
var express = require('express');
var bParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var eHandle = require('express-handlebars');
var path = require("path");

let PORT = process.env.PORT || 3000;
let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/news_scraper';

// initialize express
var app = express();

// use morgan logger for logging requests
app.use(logger('dev'));
// use body-parser for handling form submissions
app.use(bParser.urlencoded({
  extended: true
}));
// set static directory
app.use(express.static(path.join(__dirname, 'public')));
// Set Handlebars as the default templating engine
app.engine('handlebars', eHandle({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// database configuration
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

// check connection status
let db = mongoose.connection;
db.on('error', (error) => {
  console.log(`Connection error ${error}`);
});

require('./routes/routes.js')(app);

// start server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});