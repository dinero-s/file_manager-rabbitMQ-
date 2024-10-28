const fs = require('fs');
const path = require('path');

function saveFile(fileName, content) {
  const filePath = path.join(__dirname, '..', 'uploads', fileName);
  fs.writeFileSync(filePath, content);
  console.log(`File saved as ${fileName}`);
}

function processFile(fileName) {
  return new Promise((resolve) => {
    console.log(`Processing file: ${fileName}`);
    setTimeout(() => {
      console.log(`Completed processing of ${fileName}`);
      resolve();
    }, 3000);
  });
}

module.exports = { saveFile, processFile };
