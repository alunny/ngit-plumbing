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

exports['test index with cached tree'] = function (test) {
    var filepath = 'test/indexwithcache';

    readIndex(filepath, function (err, index) {
        var cachedTree, entry;

        test.equal(index.signature, 'DIRC');
        test.equal(index.version, 2);
        test.equal(Object.keys(index.extensions).length, 1);

        cachedTree = index.extensions['TREE'];
        test.ok(cachedTree);
        test.equal(25, cachedTree.length)
        test.equal(1, cachedTree.entries.length)

        entry = cachedTree.entries[0];

        test.equal('', entry.pathComponent);
        test.equal(1, entry.entryCount);
        test.equal(0, entry.subtreeCount);
        test.equal('d8329fc1cc938780ffdd9f94e0d364e0ea74f579', entry.sha);

        test.equal(index.checksum, 'b9c8417795877ea1de44959b09d92c060fedd636');
        test.ok(index.validchecksum);

        test.done();
    });
}
