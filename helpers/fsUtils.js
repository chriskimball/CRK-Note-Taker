const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

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

