//copryright 2017 blink.cloud, LLC. 
//Author: Jonathan S. Luzader

//modules
var express         = require('express');
var app             = express();
var cookieParser    = require('cookie-parser');
var Gdax            = require('gdax');
var publicClient    = new Gdax.PublicClient();

//custom
var valueAverage    = require('./lib/getValueAverage.js');
var valueLatest     = require('./lib/getValueLatest.js');

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
        
        if(data) {  
            res.status(200).json({
                status: 'success',
                data: data,
            });
        } else {
            res.status(418).json({
                status: 'failed',
                data: err
            });
        }
    });
});

app.get('/utils/currencies', function ( req, res ) {
    publicClient.getCurrencies( function ( err, response, data ) {
        if(data) {  
            res.status(200).json({
                status: 'success',
                data: data,
            });
        } else {
            res.status(418).json({
                status: 'failed',
                data: err
            });
        }
    });
});

app.get('/utils/getProduct24HrStats', function ( req, res) {
    publicClient.getProduct24HrStats( function ( err, response, data ) {
        if(data) {  
            res.status(200).json({
                status: 'success',
                data: data,
            });
        } else {
            res.status(418).json({
                status: 'failed',
                data: err
            });
        }
    });
});

app.get('/utils/getValue/:btc', function ( req, res) {
    publicClient.getProduct24HrStats( function ( err, response, data ) {

        if(data) { 
            //parse strings to float
            var highPrice = parseFloat(data.high);
            var lowPrice = parseFloat(data.low);
            var latest = parseFloat(data.last);
            var input = parseFloat(req.params.btc);

            //calc averages/latest
            var avgEst = valueAverage.getAverageValue(highPrice, lowPrice, input);
            var latestEst = valueLatest.getLatestValue(latest, input);

            res.status(200).json({
                status: 'success',
                data: data,
                averageEstimate: avgEst,
                latestEstimate: latestEst,
            });
        } else {
            res.status(418).json({
                status: 'failed',
                data: err
            });
        }
    });
});

app.listen(3800);