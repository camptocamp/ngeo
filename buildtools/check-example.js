//
// A PhantomJS script used to check that the hosted examples load
// without errors. This script is executed by the Makefile's
// check-examples target.
//
var args = require('system').args;
if (args.length != 2) {
  phantom.exit(1);
}
var examplePath = args[1];
var page = require('webpage').create();
var exitCode = 0;
page.onError = function(msg, trace) {
  var msgStack = ['JavaScript ERROR: ' + msg];
  if (trace) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
    });
  }
  console.error(msgStack.join('\n'));
  exitCode = 2;
};
page.onConsoleMessage = function(msg) {
  console.log('console:', msg);
  exitCode = 2;
};
page.open(examplePath, function(s) {
  if (s != 'success') {
    console.error('PAGE LOAD ERROR');
    phantom.exit(2);
  }

  setTimeout(function() {
    console.log("EXIT", exitCode)
    phantom.exit(exitCode);
  }, 3000)
});
