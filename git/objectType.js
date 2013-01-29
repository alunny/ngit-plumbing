var zlib = require('zlib'),
    fs = require('fs'),
    path = require('path'),
    LENGTH = 50;

module.exports = function objectType(sha, dir, callback) {
    if (!dir) dir = process.cwd();

    var shaDir = sha.substr(0,2),
        shaFile = sha.substr(2),
        shaPath = path.join(dir, shaDir, shaFile),
        dataBuffer = new Buffer(LENGTH);

    fs.open(shaPath, 'r', function (err, fd) {
        if (err) throw err;

        fs.read(fd, dataBuffer, 0, LENGTH, 0, function (err, bytesRead, buffer) {
            if (err) throw err;

            zlib.inflate(buffer, function (err, inflated) {
                if (err) throw err;

                var objType = inflated
                                .toString()
                                .split(' ')[0]

                callback(null, objType);
            });
        });
    });
}
