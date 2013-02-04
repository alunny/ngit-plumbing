var asciiDigit = require('../../helpers').asciiDigit;

function Tree(buffer, sha) {
    var offset, length = '', entry;

    this.sha = sha;
    this.objects = [];

    if (buffer.slice(0,5).toString() != 'tree ') {
        throw new Error('not a tree');
    }

    offset = 5;

    while (buffer[offset] != 0) {
        length += asciiDigit(buffer[offset++]);
    }

    this.contentLength = parseInt(length);
    offset++; // skip null

    if (buffer.slice(offset).length != this.contentLength) {
        throw new Error('incorrect content length');
    }

    console.log();

    while (offset < buffer.length) {
        entry = {
            mode: buffer.slice(offset, offset += 4).toString(),
            type: null,
            name: '',
            sha: null
        };

        entry.type = offset++;

        while (buffer[offset] != 0) {
            entry.name += buffer[offset++].toString();
        }
        
        offset++;

        entry.sha = buffer.slice(offset, offset += 20).toString('hex');

        this.objects.push(entry);
    }
}

module.exports = Tree;
