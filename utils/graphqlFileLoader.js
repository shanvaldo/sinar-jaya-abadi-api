const fs = require('fs');
const path = require('path');

module.exports = filename => fs.readFileSync(path.join(__dirname, '../resources', filename), 'utf8');
