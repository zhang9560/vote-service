var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var jsonParser = bodyParser.json();

var voteResult = [];

app.get('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send('Hello World!');
}).get('/result', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let resBody = new Object();
    for (let index in voteResult) {
        let item = voteResult[index].item;
        if (resBody.hasOwnProperty(item)) {
            resBody[item]++;
        } else {
            resBody[item] = 1;
        }
    }
    res.send(resBody);
});

app.post('/vote', jsonParser, function (req, res) {
    console.log(req.body);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.send('');

    voteResult.push(req.body);
});

app.options('*', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.send();
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
