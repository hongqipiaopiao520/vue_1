const path = require('path');
const express = require('express');
const app = express();
const mysql = require('./conn/book');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
let formidable = require('formidable');
let fs = require("fs");

app.use(urlencodedParser);
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/api/getArticle',  function(req, res){

    var sqlParams = [req.query.name,req.query.password];
    console.log(sqlParams);
    mysql.queryUser(sqlParams,function (results) {
        if(results[0]) {
                res.json({results:'1'});
            }
        else{
            res.json({results:0});
        }
    });
});
app.get('/api/getNew', function(req,res){
    console.log("1111");
    var a= req.query.page;
    var sqm = [(a-1)*8,a*8];
    mysql.query(sqm,function (result) {
        res.json({data:result});
    })
});

app.get('/api/upNumber', function(req,res){
    var a= [req.query.number,req.query.id];
    mysql.addNumber(a,function () {
        console.log('success')
    })
});

app.post('/api/update',urlencodedParser , function(req,res){
    let form = new formidable.IncomingForm();
    form.uploadDir="public/image/";
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files){
        if(err) return next(err);
        // form.uploadDir = path.join( time, 'public/');
        let imgPath = files.file.path;
        let imgName = files.file.name;
        // 返回路径和文件名
        var oldpath =   files.file.path;
        var t = (new Date()).getTime();
        let newfilename=t+imgName;
        var newpath =  'public/image/'+newfilename;
        console.log(oldpath);
        console.log(newpath);
        fs.rename(oldpath,newpath,function(err) {
            if(err) console.log("失败");
            else{
                res.json({code: 1, data: { path: newpath }})
            }
        });


    });

        console.log('success');
});
// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');