const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');

// Process the JSON file in chunks
const processJsonFile = (inputFilePath, chunkSize) => {
    let chunk = [];
    let chunkIndex = 1;

    // Read the JSON file as a stream
    const readStream = fs.createReadStream(inputFilePath, { encoding: 'utf8' });
    const jsonStream = JSONStream.parse('*');

    // Pipe the read stream through JSONStream
    readStream
        .pipe(jsonStream)
        .on('data', (data) => {
            // Add data to the current chunk
            chunk.push(data);

            // If the chunk size is reached, write the chunk to a new file
            if (chunk.length >= chunkSize) {
                writeChunkToFile(chunk, chunkIndex++);
                chunk = []; // Reset the chunk
            }
        })
        .on('end', () => {
            // Write any remaining items to a final file
            if (chunk.length > 0) {
                writeChunkToFile(chunk, chunkIndex++);
            }
            console.log('Processing completed.');
        })
        .on('error', (err) => {
            console.error('Error processing the file:', err);
        });
};

// Helper function to write a chunk to a file
const writeChunkToFile = (chunk, index) => {
    const outputFilePath = path.join(__dirname, `outputProducts_${index}.json`);
    fs.writeFile(outputFilePath, JSON.stringify(chunk, null, 2), 'utf8', (err) => {
        if (err) {
            console.error(`Error writing file ${outputFilePath}:`, err);
        } else {
            console.log(`File ${outputFilePath} has been saved successfully.`);
        }
    });
};

// Define the input file path and chunk size
const inputFilePath = path.join(__dirname, 'FinalProducts.json');
const chunkSize = 50000;

// Process the JSON file
processJsonFile(inputFilePath, chunkSize);
