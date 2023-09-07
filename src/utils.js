const { fileURLToPath } = require('url');
const { dirname } = require('path');

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

module.exports = __dirname;