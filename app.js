//copryright 2017 blink.cloud, LLC. 
//Author: Jonathan S. Luzader


var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

var Gdax = require('gdax');
var publicClient = new Gdax.PublicClient();

//setup middleware
app.use(cookieParser());
app.use(require('body-parser').urlencoded({ extended: true }));


app.get('/', function ( req, res ) {
    res.status(200).json({
        status: 'success',
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

app.get('/utils/getValue/:btc', function ( req, res) {
    publicClient.getProduct24HrStats( function ( err, response, data ) {
        
        var highPrice = parseFloat(data.high);
        var lowPrice = parseFloat(data.low);
        var input = parseFloat(req.params.btc);
        
        var avg = (highPrice + lowPrice) / 2;

        var est = input* avg;
        
        res.status(200).json({
            status: 'success',
            estimatedValue: est,
            data: data,
        });
    });
});

app.listen(3800);