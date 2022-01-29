/* DB has this object
 {
    'title':'',
    'text':'',
    'id':''
}*/

//Required modules
const express = require('express');
const { fstat } = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const fs = require('./helpers/fsUtils')
/* https://www.npmjs.com/package/uuid
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
*/

const app = express();
const PORT = 3001;

const notes = require('./db/db.json');

// Defining the front end directory.
app.use(express.static('public'));

// Middleware for parsing the application/json and URLencoded data.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Fetch notes request
app.get('/notes', (req, res) => {

    // Send the file `notes.html`
    res.sendFile( path.join( __dirname, 'public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    
    const db = fs.readFile('./db/db.json');

    console.log(db)
    // Fetching db.json data
    res.json( /* send note data */)
});

app.post('/api/notes', (req, res) => {
    
    // Access the note data that was being sent
    const newNote = req.body;

    // Create (persist) data

    // Add on uuid function onto the note object to allow DELETE function (DAY 2 Activity 20)

    // Access the new note from `req`

    // Push it to my existing list of notes

    // Write my updated notes list to the `db.json` file
    
    res.json(/* note data */);

});

app.listen(PORT, () => {
    console.log( `Note taker app listening at http://localhost:${PORT}`)
});
