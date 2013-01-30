// only works for V2 entries right now
function IndexEntry(data, version) {
    var offset = 0, oldOffset;

    this.ctime = {
        seconds: data.readUInt32BE(offset),
        nanoseconds: data.readUInt32BE(offset += 4)
    };
    this.mtime = {
        seconds: data.readUInt32BE(offset += 4),
        nanoseconds: data.readUInt32BE(offset += 4)
    };
    this.dev        = data.readUInt32BE(offset += 4);
    this.ino        = data.readUInt32BE(offset += 4);
    this.mode       = data.readUInt32BE(offset += 4); // DEAL_WITH_IT
    this.uid        = data.readUInt32BE(offset += 4);
    this.gid        = data.readUInt32BE(offset += 4);
    this.filesize   = data.readUInt32BE(offset += 4);

    this.sha = data.slice(offset += 4, offset += 20).toString('hex');

    this.flags      = data.readUInt16BE(offset); // DEAL_WITH_IT

    // grab path name
    oldOffset = offset += 2;
    while (data[offset]) offset++;

    this.pathname   = data.slice(oldOffset, offset).toString('utf8');

    while(!data[offset]) offset++;

    this.length = offset;
}

module.exports = IndexEntry;
