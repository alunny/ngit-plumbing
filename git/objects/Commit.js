var asciiDigit = require('../../helpers').asciiDigit;

function Commit(buffer, sha) {
    var offset, length = '', name, nameStart, nameEnd;

    this.sha        = sha;
    this.parents    = [];
    this.tree       = null;
    this.author     = null;
    this.committer  = null;
    this.message    = null;

    if (buffer.slice(0,7).toString() != 'commit ') {
        throw new Error('not a commit');
    }

    offset = 7;

    while (buffer[offset] != 0) {
        length += asciiDigit(buffer[offset++]);
    }

    this.contentLength = parseInt(length);
    offset++; // skip null

    if (buffer.slice(offset).length != this.contentLength) {
        throw new Error('incorrect content length');
    }

    while (offset < buffer.length) {
        nameStart = offset;

        if (buffer[offset] == 10) {
            // we've gotten to the end - commit msg time
            offset++;

            this.message = buffer.slice(offset).toString();
            break;
        } else {
            while (buffer[offset] != 32) {
                if (offset >= buffer.length) break;

                nameEnd = offset++;
            }

            name = buffer.slice(nameStart, nameEnd + 1).toString();
            offset++; //space

            if (name == 'tree') {
                // stored as ascii, not hex
                this.tree = buffer.slice(offset, offset += 40).toString();
            } else if (name == 'parent') {
                this.parents.push(buffer.slice(offset, offset += 40).toString());
            } else if (name == 'author' || name == 'committer') {
                nameStart = offset;
                while (buffer[offset] != 0x0a) offset++;

                this[name] = buffer.slice(nameStart, offset).toString();
            }

            offset++; // skip null or newline
        }
    }
}

module.exports = Commit;
