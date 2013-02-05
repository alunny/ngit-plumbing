var Commit = require('../../git/objects/Commit'),
    fs = require('fs'),
    zlib = require('zlib');

exports['simple parsing'] = function (test) {
    var raw = fs.readFileSync('test/gitobjects/1c/b35470c42e7578ca0a54b1b53152311dd13717');

    zlib.inflate(raw, function (err, decoded) {
        var commit = new Commit(decoded, null)

        test.equal(222, commit.contentLength);
        test.equal('c4b37fede49d66eef3d3d4ae300cd426600452c8', commit.tree);
        test.equal(1, commit.parents.length);
        test.equal('6610cf1e3b21e315ffff374c529949b4ae4e8db5', commit.parents[0]);

        // TODO: handle dates
        test.equal('alunny <alunny@gmail.com> 1359449960 -0800', commit.author);
        test.equal('alunny <alunny@gmail.com> 1359449960 -0800', commit.committer);

        test.equal('reading objects from FS\n', commit.message);

        test.done();
    });
}
