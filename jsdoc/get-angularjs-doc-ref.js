var https = require("https");
var data = "";

https.get('https://docs.angularjs.org/js/search-data.json', function (result) {

    result.setEncoding('utf8');

    result.on('data', function(chunk) {
        data += chunk;
    });

    result.on('end', function() {
        var json = JSON.parse(data);
        var i, ref;
        console.log("exports.registerAngularJSLink = function(helper) {");
        for (i = 0; i < json.length; i++) {
            ref = json[i];
            if(!ref['path'].match(/^error/)) {
                console.log(
                    "    helper.registerLink('angular." +
                    ref['titleWords'] +
                    "', 'https://docs.angularjs.org/" +
                    ref['path'] +
                    "');"
                );
            }
        }
        console.log("    helper.registerLink('angular.Scope', " +
            "'https://docs.angularjs.org/guide/scope');");
        console.log("}");
    })

});
