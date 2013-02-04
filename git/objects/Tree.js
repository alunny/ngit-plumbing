var asciiDigit = require('../../helpers').asciiDigit;

function Tree(buffer, sha) {
    var offset, length = '', entry, nameStart, nameEnd;

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

    while (offset < buffer.length) {
        entry = {
            mode: '',
            type: null,
            name: '',
            sha: null
        };

        while(buffer[offset] != 32) {
            entry.mode += asciiDigit(buffer[offset++]);
        }

        if (entry.mode == '40000') entry.mode = '040000';

        setObjType(entry);

        offset++; // space

        nameStart = offset;
        while (buffer[offset] != 0) {
            nameEnd = offset++;
        }

        entry.name = buffer.slice(nameStart, nameEnd + 1).toString();

        offset++; // null

        entry.sha = buffer.slice(offset, offset += 20).toString('hex');

        this.objects.push(entry);
    }
}

function setObjType(entry) {
    if (entry.mode == '040000') {
        entry.type = 'tree';
    } else if (entry.mode == '100644') {
        entry.type = 'blob';
    }
}

module.exports = Tree;
