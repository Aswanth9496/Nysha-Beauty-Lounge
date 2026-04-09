const fs = require('fs');
const path = require('path');

const targetUrl = 'https://api.tranzendsystems.com';
const oldUrl = 'http://localhost:5000';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const dirPath = path.join(__dirname, 'client/src');
let changedFiles = 0;

walkDir(dirPath, function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(oldUrl)) {
      const newContent = content.replaceAll(oldUrl, targetUrl);
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Updated: ${filePath}`);
      changedFiles++;
    }
  }
});

console.log(`Completed. Changed ${changedFiles} files.`);
