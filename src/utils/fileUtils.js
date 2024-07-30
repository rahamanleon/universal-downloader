const fs = require('fs-extra');

async function saveStreamToFile(stream, filePath) {
    await fs.ensureDir(filePath.replace(/\/[^/]+$/, ''));
    const writeStream = fs.createWriteStream(filePath);
    return new Promise((resolve, reject) => {
        stream.pipe(writeStream);
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
    });
}

module.exports = {
    saveStreamToFile,
};
