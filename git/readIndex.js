var fs = require('fs'),
    Index = require('./Index');

module.exports = function readIndex(filepath, callback) {
    fs.readFile(filepath, function (err, data) {
        if (err) throw err;

        callback(null, new Index(data));
    });
}
