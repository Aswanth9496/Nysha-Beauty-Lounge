const fs = require('fs');
const path = require('path');

/**
 * Delete a file from the server
 * @param {string} filePath - The path to the file (e.g., /uploads/filename.jpg)
 */
exports.deleteFile = (filePath) => {
  if (!filePath) return;

  // Convert relative URL path to absolute file system path
  // Since images are stored as /uploads/filename, we remove the leading / and join with __dirname
  const absolutePath = path.join(__dirname, '..', filePath);

  fs.access(absolutePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`File does not exist: ${absolutePath}`);
      return;
    }

    fs.unlink(absolutePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${absolutePath}`, err);
      } else {
        console.log(`Successfully deleted file: ${absolutePath}`);
      }
    });
  });
};
