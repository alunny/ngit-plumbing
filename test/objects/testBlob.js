var Blob = require('../../git/objects/Blob');

exports['test creation'] = function (test) {
    var content = "Hello World\n",
        b = new Blob(content);

    test.equal(b.content, 'Hello World\n');
    test.equal(b.data, 'blob 12\0Hello World\n');
    test.equal(b.sha, '557db03de997c86a4a028e1ebd3a1ceb225be238');
    test.done();
}
