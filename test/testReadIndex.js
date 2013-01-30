var readIndex = require('../git/readIndex');

exports['test simple index'] = function (test) {
    var filepath = 'test/simpleindex';

    readIndex(filepath, function (err, index) {
        test.equal(index.signature, 'DIRC');
        test.equal(index.version, 2);
        test.equal(index.indexLength, 1);

        test.equal(index.entries[0].sha,
            '83baae61804e65cc73a7201a7252750c76066a30');

        test.equal(index.entries[0].pathname, 'test.txt');
        test.equal(index.entries[0].length, 72);

        test.equal(index.checksum, '83a8b4028da30cc7105d83e0db6c7a7dc915bd52');
        test.ok(index.validchecksum);

        test.done();
    });
}
