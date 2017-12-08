'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://101.89.140.195:27017/notify');
// 链接错误
db.on('error', function (error) {
    console.log(error);
});

var notifySchema = mongoose.Schema({
    txid: String,
    contract: String,
    state: {
        type: String,
        value: {
            type: String,
            value: String
        }
    }
});

notifySchema.methods.findbytxid = function (txid, callback) {
    return this.model('testnet').find({ txid: txid }, callback);
};

//name ,Schema, Collection Name
var notifyModel = db.model('testnet', notifySchema,'testnet');

//db.close();

/* GET home page. */
router.get('/', function (req, res) {
    //var a = new notifyModel({ txid: 'small' });
    //a.save(function (err) {
    //    if (err) return handleError(err);
    //    // saved!
    //})

    var query = notifyModel.find();

    query.exec(function (error, result) {
        if (error) {
            console.log(error);
        } else {
            console.log(result.toString());
            res.render('showNotify', { title: 'showNotify', mongodata: result.toString() });    
            //console.log("Find");
            //console.log("WS TYPE=jsonP");
            ////console.log(req.ip);
            //console.log(req.headers['x-real-ip']);
            //console.log("callbackFn:" + req.query.callback);
            //for (var i = 0; i < result.length; i++) {
            //    //console.log(result[i].eval.evalTime);
            //    var thisTime = result[i].eval.evalTime;
            //    result[i].eval.evalTimeStr = moment(thisTime).format("YYYY-MM-DD HH:mm:ss");
            //    //console.log(result[i].eval.evalTime);
            //}
            //res.jsonp(result);
        }
    });

    //var str = 'mongodb'; 
    //res.render('index', { title: 'NEL NNS Browser', mongodata: str });    
    
});

module.exports = router;
