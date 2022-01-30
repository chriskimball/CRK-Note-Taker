// Required modules
const express = require('express');
const path = require('path');
const routes = require('./routes');

// Defining the app and PORT constants.
const app = express();
const PORT = process.env.PORT || 3001;


// Middleware for parsing the application/json and URLencoded data.
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', routes);

// Defining the front end directory.
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes.html page
app.get('/notes', (req, res) => 
    res.sendFile( path.join( __dirname, '/public/notes.html'))
);

// Wildcard route to direct users to index page if mistyped route
app.get('*', (req, res) => 
    res.sendFile( path.join( __dirname, '/public/index.html'))
);

app.listen(PORT, () => 
    console.log( `Note taker app listening at http://localhost:${PORT}`)
);