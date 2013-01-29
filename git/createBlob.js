var crypto = require('crypto');

// TODO: be a stream also
module.exports = function createBlob(data) {
    return crypto
        .createHash('sha1')
        .update('blob ' + data.length + '\0')
        .update(data)
        .digest('hex');
}
