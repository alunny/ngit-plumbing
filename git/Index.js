var crypto = require('crypto'),
    IndexEntry = require('./IndexEntry');

function Index(rawData) {
    var offset = 12, i = 0, entry;

    this.entries = [];

    // header (fixed size)
    this.signature      = rawData.toString('ascii', 0, 4);
    this.version        = rawData.readUInt32BE(4);
    this.indexLength    = rawData.readUInt32BE(8);

    for (i; i < this.indexLength; i++) {
        entry = new IndexEntry(rawData.slice(offset));
        this.entries.push(entry);
        offset += entry.length;
    }

    while ((rawData.length - offset) > 20) {
        // TODO: deal with extensions
        offset++;
    }

    this.checksum = rawData.slice(offset).toString('hex');
    this.validchecksum = checkChecksum(this.checksum, rawData);
}

function checkChecksum(checksum, rawData) {
    var expected = crypto
                    .createHash('sha1')
                    .update(rawData.slice(0, rawData.length - 20))
                    .digest('hex');

    return expected == checksum;
}

module.exports = Index;
