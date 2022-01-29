const fs = require('fs');

const readFile = (filePath) =>{
    fs.readFile(
        filePath, // File name
        'utf8', // Character encoding (pretty much always utf8)
        (error, data) => { 
          error ? console.error(error) : console.log(data) // our call back function
        
        }
      );
};

const writeFile = (filePath, fileData) => {
    fs.writeFile(
        filePath, // file name
        fileData, // content to write
        (err) => 
        err ? console.error(err) : console.log('Success!') //call back function
      );
};


module.exports = {
    readFile, 
    writeFile
};