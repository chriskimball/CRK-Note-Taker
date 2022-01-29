//Required modules
const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;


// Middleware for parsing the application/json and URLencoded data.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Defining the front end directory.
app.use(express.static('public'));

app.use('/api',routes)

// Fetch notes request
app.get('/notes', (req, res) => {
    // Send the file `notes.html`
    res.sendFile( path.join( __dirname, 'public/notes.html'))
});

app.listen(PORT, () => {
    console.log( `Note taker app listening at http://localhost:${PORT}`)
});
