(function() {
    window.global_test_results = {
        "passed": 0,
        "failed": 1,
        "total": 1,
        "duration": 1,
        "tests": []
    };
    Raven.config('http://public@example.com/1').install();
    TraceKit.report.subscribe(function (stackinfo) {
        window.global_test_results.tests.push({
            "name": "captureException stack trace",
            "result": false,
            "message": JSON.stringify(stackinfo, null, 4),
            "duration": 1
        });
    });

    function stackElement1(foo) {
        stackElement2();
    }
    function stackElement2() {
        iAmAnError();
    }

    try {
        stackElement1('bar');
    } catch(e) {
        Raven.captureException(e);
    }

    try {
        stackElement1('bar');
    } catch(e) {
        TraceKit.report(e);
    }
}());
