/* DB has this object
 {
    'title':'',
    'text':'',
    'id':''
}*/

//Required modules
const express = require('express');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const { readFile, writeFile } = require('./helpers/fsUtils')


/* https://www.npmjs.com/package/uuid
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
*/

const app = express();
const PORT = process.env.PORT || 3001;

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
    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

app.post('/api/notes', (req, res) => {
    
    // Access the note data that was being sent
    const { title, text } = req.body

    const newNote = {
            title: title,
            text: text,
            id: uuidv4(),
        };
    
    readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(newNote);
            writeFile('./db/db.json', JSON.stringify(parsedData, null, 4));
        }
    });

    res.sendFile( path.join( __dirname, 'public/notes.html'))
});

app.delete('/api/notes/:id', function (req, res) {

    const params = req.params.id;

    readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
            const parsedData = JSON.parse(data);

            for (let [i, obj] of parsedData.entries()) {
                if (obj.id == params) {
                    
                    parsedData.splice(i, 1);
                    
                    writeFile('./db/db.json', JSON.stringify(parsedData, null, 4));
                };
            };
        };
    });
    res.sendFile( path.join( __dirname, 'public/notes.html'))
});

app.listen(PORT, () => {
    console.log( `Note taker app listening at http://localhost:${PORT}`)
});
