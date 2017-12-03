
var express = require('express');
var app = express();

var Gdax = require('gdax');
var publicClient = new Gdax.PublicClient();


app.get('/', function ( req, res ) {
    res.status(200).json({
        status: 'success'
    });
});

app.get('/utils/products', function ( req, res ) {
    publicClient.getProducts( function (err, response, data) {
        res.status(200).json({
            status: 'success',
            data: data,
        });
    });
});

app.get('/utils/currencies', function ( req, res ) {
    publicClient.getCurrencies( function ( err, response, data ) {
        res.status(200).json({
            status: 'success',
            data: data,
        });
    });
});

app.get('/utils/getProduct24HrStats', function ( req, res) {
    publicClient.getProduct24HrStats( function ( err, response, data ) {
        res.status(200).json({
            status: 'success',
            data: data,
        });
    });
});

app.get('/utils/getPortfolioEstimatedValue/:btc', function ( req, res) {
    publicClient.getProduct24HrStats( function ( err, response, data ) {
        var avg = (data.open + data.close) / 2;
        var est = req.params.btc * avg;
        
        res.status(200).json({
            status: 'success',
            estimatedValue: est,
        });
    });
});

app.listen(3800);