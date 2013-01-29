var provideContent = require('../git/provideContent'),
    fs = require('fs');

exports['test one'] = function (test) {
    var SHA = '3c3629e647f5ddf82548912e337bea9826b434af';

    provideContent(SHA, 'test/gitobjects', function (err, data) {
        if (err) throw err;

        test.equal(data.toString(), 'blob 13\0node_modules\n');
        test.done();
    });
}
