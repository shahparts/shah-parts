const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

// Path to your CSV file
const csvFilePath = path.join(__dirname, 'FinalProducts.csv');

// Path to save the converted JSON file
const jsonFilePath = path.join(__dirname, 'FinalProducts.json');

csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        // Write JSON object to file
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonObj, null, 2));
        console.log('CSV file successfully converted to JSON');
    })
    .catch((error) => {
        console.error('Error converting CSV to JSON:', error);
    });
