const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

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

