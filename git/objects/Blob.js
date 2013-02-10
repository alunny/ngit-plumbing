var crypto = require('crypto');

function Blob (content) {
    this.content = content;
    this.data = 'blob ' + content.length + '\0' + content;
    this.sha = crypto.createHash('sha1')
                     .update(this.data).digest('hex');
}

module.exports = Blob;
