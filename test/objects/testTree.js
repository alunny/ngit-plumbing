var Tree = require('../../git/objects/Tree'),
    fs = require('fs'),
    zlib = require('zlib');

exports['simple parsing'] = function (test) {
    var raw = fs.readFileSync('test/gitobjects/f3/a28416e4c8a742e0dde37693701ce2e7773fe2');

    zlib.inflate(raw, function (err, decoded) {
        var tree = new Tree(decoded, null),
            obj1, obj2, obj3;

        test.equal(131, tree.contentLength);
        test.equal(3, tree.objects.length);

        // test each object
        obj1 = tree.objects[0];
        obj2 = tree.objects[1];
        obj3 = tree.objects[2];

        test.equal('040000', obj1.mode);
        test.equal('tree', obj1.type);
        test.equal('gitobjects', obj1.name);
        test.equal('0f8698578aa03b2fc3114553498d32e19c1fd47a', obj1.sha);

        test.equal('100644', obj2.mode);
        test.equal('blob', obj2.type);
        test.equal('testCreateBlob.js', obj2.name);
        test.equal('dc77506af0a97a1058a259c8b95fd729819c68ad', obj2.sha);

        test.equal('100644', obj3.mode);
        test.equal('blob', obj3.type);
        test.equal('testProvideContent.js', obj3.name);
        test.equal('7ae7f05ce7c236711b5f1f4e5dd088b0f1bccb84', obj3.sha);

        test.done();
    });
}
