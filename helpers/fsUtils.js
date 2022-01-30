// Required modules for the fs utility helper functions.
const fs = require('fs');
const util = require('util');

// Promise based version of fs.readfile module
const readFile = util.promisify(fs.readFile);

// Defining write file function in that accepts the file path and file data arguments to help us write json data to db.json file.
const writeFile = (filePath, fileData) => {
    fs.writeFile(
        filePath, // file name
        fileData, // content to write
        (err) => 
        err ? console.error(err) : console.log('DB successfully updated.') //call back function
      );
};

module.exports = {
    readFile, 
    writeFile
};