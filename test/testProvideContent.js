var provideContent = require('../git/provideContent'),
    fs = require('fs'),
    zlib = require('zlib');

exports['test blob'] = function (test) {
    var SHA = '3c3629e647f5ddf82548912e337bea9826b434af';

    provideContent(SHA, 'test/gitobjects', function (err, data) {
        if (err) throw err;

        test.equal(data.toString(), 'blob 13\0node_modules\n');
        test.done();
    });
}

exports['test commit'] = function (test) {
    var SHA = '1cb35470c42e7578ca0a54b1b53152311dd13717',
        raw = fs.readFileSync('test/gitobjects/1c/b35470c42e7578ca0a54b1b53152311dd13717');

    zlib.inflate(raw, function (err, decoded) {
        var expected = decoded.toString();

        provideContent(SHA, 'test/gitobjects', function (err, data) {
            if (err) throw err;

            test.equal(data.toString(), expected);
            test.done();
        });
    });
}

exports['test tree'] = function (test) {
    var SHA = 'f3a28416e4c8a742e0dde37693701ce2e7773fe2',
        raw = fs.readFileSync('test/gitobjects/f3/a28416e4c8a742e0dde37693701ce2e7773fe2');

    zlib.inflate(raw, function (err, decoded) {
        var expected = decoded.toString('ascii');

        provideContent(SHA, 'test/gitobjects', function (err, data) {
            if (err) throw err;

            test.equal(data.toString(), expected);
            test.done();
        });
    });
}
