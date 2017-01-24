var express = require('express');
var uuid = require('uuid');
var bodyParser = require('body-parser');
var app = express();
var jsonParser = bodyParser.json();

var voteResults = {};
var voteItems = {};

app.get('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send();
}).get('/result', function (req, res) {
    let voteId = req.query['id'];
    let voteResult = voteResults[voteId];
    let resBody = new Object();

    if (voteResult !== undefined) {
        for (let index in voteResult) {
            let item = voteResult[index].item;
            if (resBody.hasOwnProperty(item)) {
                resBody[item]++;
            } else {
                resBody[item] = 1;
            }
        }
    }
    console.log(resBody);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(resBody);
}).get('/get_vote', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    let voteId = req.query['id'];
    if (voteId === undefined) {
        res.send({result: 1, errMsg: 'no query named id'});
    } else {
        res.send({result: 0, id: voteId, data: voteItems[voteId]});
    }
});

app.post('/vote', jsonParser, function (req, res) {
    console.log(req.body);
    let voteId = req.body.id;
    delete req.body.id;

    let result = voteResults[voteId];
    if (result === undefined) {
        result = [req.body];
        voteResults[voteId] = result;
    } else {
        result.push(req.body);
    }
    console.log(result);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.send({result: 0});
}).post('/create_vote', jsonParser, function (req, res) {
    console.log(req.body);
    let voteId = uuid.v4();
    voteItems[voteId] = req.body;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.send({result: 0, id: voteId});
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
