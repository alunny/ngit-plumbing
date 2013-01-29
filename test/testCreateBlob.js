var createBlob = require('../git/createBlob');

exports['test one'] = function (test) {
    var content = "Hello World\n";

    test.equal(createBlob(content), '557db03de997c86a4a028e1ebd3a1ceb225be238');
    test.done();
}
