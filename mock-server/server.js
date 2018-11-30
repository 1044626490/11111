var path = require('path');
var fs = require('fs');
var mock = require("mockjs");
var app = require('express')();
var port = process.argv.slice(2)[0] || 5555;
var apiPath = path.join(__dirname, './api.json');
var api = {};

function getApis() {
    fs.readFile(apiPath, 'utf-8', function (err, content) {
        api = JSON.parse(content);
    });
}

//监听api.json变化
fs.watchFile(apiPath, function (curr) {
    console.info('mock server update');
    getApis();
});
getApis();
var server = app.listen(port, function() {
    console.info('Mock server is listening at ' + port);
});
app.use(function (req,res) {
    var data = undefined;
    var delay = 0;
    for (var url in api) {
        let findResults = api[url].find(function (responseData) {
            if (responseData.regexp) {
                if (!new RegExp(responseData.url).test(req.originalUrl)) {
                    return false;
                }
            } else if (req.originalUrl !== responseData.url) {
                return false
            }
            var apiRes = responseData.res;
            data = responseData.mock !== false ? mock.mock(apiRes) : apiRes;
            delay = responseData.delay || 0;
            return true;
        });
        if(findResults!==undefined){
            break;
        }
    }
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    data !== undefined ? setTimeout(() => res.jsonp(data), delay) : res.sendStatus(404);
});