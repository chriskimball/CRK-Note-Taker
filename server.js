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
const { readFile, writeFile } = require('./helpers/fsUtils')


/* https://www.npmjs.com/package/uuid
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
*/

const app = express();
const PORT = process.env.PORT || 3001;

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
    
    // readFile('./db/db.json')
    
    
    // console.log("notesdata:",notes)
    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
    // Fetching db.json data
    // res.json( fs.readFile('./db/db.json') )
    // './db/feedback.json').then((data) => res.json(JSON.parse(data))
});

app.post('/api/notes', (req, res) => {
    
    // Access the note data that was being sent
    const { title, text } = req.body

    const newNote = {
            title: title,
            text: text,
            id: uuidv4(),
            };
    console.log(newNote)


    readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedData = JSON.parse(data);
          parsedData.push(newNote);
          writeFile('./db/db.json', JSON.stringify(parsedData, null, 4));
        }
      });
    // // Create (persist) data
        
    // // Add on uuid function onto the note object to allow DELETE function (DAY 2 Activity 20)

    // // Access the new note from `req`
    
    // // Push it to my existing list of notes

    // // Write my updated notes list to the `db.json` file
    
    // res.json(/* note data */);

});

app.listen(PORT, () => {
    console.log( `Note taker app listening at http://localhost:${PORT}`)
});
