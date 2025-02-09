const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

// Path to your CSV file
const csvFilePath = path.join(__dirname, 'FinalProducts.csv');

// Path to save the converted JSON file
const jsonFilePath = path.join(__dirname, 'FinalProducts.json');

// Create a writable stream for the JSON file
const writeStream = fs.createWriteStream(jsonFilePath);

// Write the opening bracket for a JSON array
writeStream.write('[');

let isFirst = true;

// Stream the CSV file
csv()
  .fromFile(csvFilePath)
  .subscribe(
    (jsonObj) => {
      // Dynamically remove fields that are not in the header row
      const validHeaders = Object.keys(jsonObj).filter((key) => !key.startsWith('field'));
      const cleanedObj = {};
      validHeaders.forEach((header) => {
        cleanedObj[header] = jsonObj[header];
      });

      // Write each cleaned object to the JSON file
      if (!isFirst) {
        writeStream.write(',\n');
      }
      writeStream.write(JSON.stringify(cleanedObj, null, 2));
      isFirst = false;
    },
    (error) => {
      console.error('Error converting CSV to JSON:', error);
      writeStream.end();
    },
    () => {
       // Write the closing bracket for the JSON array and close the stream
      writeStream.write(']');
      writeStream.end();
      console.log('CSV file successfully converted to JSON');
    }
  );

