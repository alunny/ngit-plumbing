var objectType = require('../git/objectType'),
    fs = require('fs');

exports['blob'] = function (test) {
    var SHA = '3c3629e647f5ddf82548912e337bea9826b434af';

    objectType(SHA, 'test/gitobjects', function (err, data) {
        if (err) throw err;

        test.equal(data.toString(), 'blob');
        test.done();
    });
}

exports['tree'] = function (test) {
    var SHA = 'f3a28416e4c8a742e0dde37693701ce2e7773fe2';

    objectType(SHA, 'test/gitobjects', function (err, data) {
        if (err) throw err;

        test.equal(data.toString(), 'tree');
        test.done();
    });
}

exports['commit'] = function (test) {
    var SHA = '1cb35470c42e7578ca0a54b1b53152311dd13717';

    objectType(SHA, 'test/gitobjects', function (err, data) {
        if (err) throw err;

        test.equal(data.toString(), 'commit');
        test.done();
    });
}
