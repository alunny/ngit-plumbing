var Tree = require('../../git/objects/Tree'),
    fs = require('fs'),
    zlib = require('zlib');

exports['simple parsing'] = function (test) {
    var raw = fs.readFileSync('test/gitobjects/f3/a28416e4c8a742e0dde37693701ce2e7773fe2');

    zlib.inflate(raw, function (err, decoded) {
        var tree = new Tree(decoded, null);

        test.equal(131, tree.contentLength);
        test.equal(3, tree.objects.length);

        console.log(tree.objects);
        test.done();
    });
}
