var zlib = require('zlib'),
    fs = require('fs'),
    path = require('path');

module.exports = function provideContent(sha, dir, callback) {
    if (!dir) dir = process.cwd();

    var shaDir = sha.substr(0,2),
        shaFile = sha.substr(2),
        shaPath = path.join(dir, shaDir, shaFile);

    // TODO: stream instead
    fs.readFile(shaPath, function (err, data) {
        if (err) throw err;

        zlib.inflate(data, function (err, inflated) {
            if (err) throw err;

            callback(null, inflated)
        });
    });
}
