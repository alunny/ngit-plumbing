var asciiDigit = require('../helpers').asciiDigit;

function CachedTree(buffer) {
    var offset = 0, entry, count;

    this.length = 0; // fill in in index parser
    this.entries = [];

    while (offset < buffer.length) {
        entry = new CachedTreeEntry;

        while (buffer[offset] != 0) {
            entry.pathComponent += buffer[offset].toString();
        }

        offset++;
        count = '';

        while (buffer[offset] != 32) {
            count += asciiDigit(buffer[offset++]);
        }

        entry.entryCount = parseInt(count);

        offset++;
        count = '';

        while (buffer[offset] != 10) {
            count += asciiDigit(buffer[offset++]);
        }

        entry.subtreeCount = parseInt(count);

        offset++;

        entry.sha = buffer.slice(offset, offset += 20).toString('hex');

        this.entries.push(entry);
    }
}

function CachedTreeEntry() {
    this.pathComponent  = '';
    this.entryCount     = '';
    this.subtreeCount   = '';
    this.sha            = '';
}

module.exports = CachedTree;
