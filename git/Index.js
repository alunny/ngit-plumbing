var crypto = require('crypto'),
    IndexEntry = require('./IndexEntry'),
    CachedTree = require('./CachedTree'),
    CACHED_TREE     = 'TREE',
    RESOLVE_UNDO    = 'REUC';

function Index(rawData) {
    var offset = 12,
        i = 0,
        entry, nextBytes, extSize, extension;

    this.entries    = [];
    this.extensions = {};

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
        nextBytes = rawData.toString('ascii', offset, offset + 4);

        if (nextBytes == CACHED_TREE || nextBytes == RESOLVE_UNDO) {
            extSize = rawData.readUInt32BE(offset += 4);
            offset += 4;

            extension = new CachedTree(rawData.slice(offset, offset += extSize));
            extension.length = extSize;

            this.extensions[CACHED_TREE] = extension;
        } else {
            offset++;
        }
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
