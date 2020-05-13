// 加载模块
let path = require('path');
let querystring = require('querystring');
// var router = express.Router();
let express = require('express');
var router = express.Router();
let app = express();
let sql = require('../SQL/sql');
// let cookieParser = require('cookie-parser');
// app.use(cookieParser());
// 引入cookie
let cookieParser = require('cookie-parser')
// 使用cookie中间键
app.use(cookieParser());
// 端口号
router.use((req, res, next) => {
    if (req.protocol == "http") {
        let protocol = req.protocol == "http" ? "https" : req.protocol;
        let fullURL = protocol + '://' + req.get('host') + req.originalUrl
        res.redirect(302, fullURL);
    }
    next();
})
app.set('port', process.env.PORT || 8081);

// 跨域处理
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie");
    res.header("Access-Control-Allow-Methods", "POST,GET");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Content-Security-Policy: upgrade-insecure-requests");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

    next();
});
// ========================================查询用户名是否已经被注册


app.get('/login/res', (req, res) => {
    let name = req.query
    console.log(name)
    sql.checkname(name, (result) => {
        res.send(result)
    });
    // console.log(req.query)
    // let name = ''
    // req.on('data',function(data){
    //     name += req.query
    //     console.log(name)
    // })
});
// ===========================================用户登录状态
app.get('/login',(req,res)=>{
    let id = req.query;
    console.log(id);
    sql.checkid(id,(result)=>{
        console.log(result)
        res.send(result);
    })
});
// ========================================接受用户注册
app.post('/login/res', function (req, res) {
    let post = '';
    req.on('data', function (data) {
        post += data
        // console.log(post)
    });
    req.on('end', function () {
        // 转化为json对象
        post = JSON.parse(post);
        sql.addusers(post, function (result) {
            console.log(result)
            if (result) {
                res.send(result);

            } else {
                res.send('.....')
            }
        });
    })
})
// ==========================================用户登录

// exports.id = -1;
app.post('/login/login_in', (req, res) => {
    let post = '';
    req.on('data', (data) => {
        post += data
    });
    req.on('end', () => {
        post = JSON.parse(post);
        sql.login(post, (result) => {
            res.send(result);
        });
    });


});
// 获取cookie



app.listen(app.get('port'), function () {
    console.log(app.get('port'))
});

