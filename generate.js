const fs = require('fs');
const path = require('path');

const processJsonFile = (inputFilePath, chunkSize) => {
    fs.readFile(inputFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        let products;
        try {
            products = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return;
        }

        // Split products into chunks of chunkSize
        for (let i = 0; i < products.length; i += chunkSize) {
            const chunk = products.slice(i, i + chunkSize);
            const outputFilePath = path.join(__dirname, `outputProducts_${i / chunkSize + 1}.json`);

            fs.writeFile(outputFilePath, JSON.stringify(chunk, null, 2), 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error('Error writing the file:', writeErr);
                } else {
                    console.log(`File ${outputFilePath} has been processed and saved successfully.`);
                }
            });
        }
    });
};

// Define the input file path and chunk size
const inputFilePath = path.join(__dirname, 'FinalProducts.json');
const chunkSize = 50000;

// Process the JSON file
processJsonFile(inputFilePath, chunkSize);
