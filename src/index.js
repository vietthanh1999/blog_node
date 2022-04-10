const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

//Connect to db
db.connect();

app.use(express.static(path.join(__dirname, '/public')));

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.use(methodOverride('_method'))

//HTTP Logger
app.use(morgan('combined'));

// Template engine
app.engine(
  'hbs',
  handlebars.engine({ extname: '.hbs', defaultLayout: 'main',
  helpers: {
    sum: (a, b) => a + b
  } 
}),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
