const https = require("https");
const jsdom = require("jsdom");
const jquery = require("jquery");

const { JSDOM } = jsdom;
var data = "";

https.get('https://openlayers.org/en/master/apidoc/index.html', function (result) {
    result.setEncoding('utf8');

    result.on('data', function(chunk) {
        data += chunk;
    });

    result.on('end', function() {
        $ = jquery(new JSDOM(data).window);
        console.log("exports.registerOl3Link = function(helper) {");
        $('[data-name]').each(function (index, element) {
            if (element.querySelector('a') != null) {
                console.log(
                    "    helper.registerLink('" +
                    element.getAttribute("data-name") +
                    "', 'http://openlayers.org/en/master/apidoc/" +
                    element.querySelector("a").getAttribute("href") +
                    "');"
                )
            }
        });
        console.log("}");
    });
});
