// 加载模块
let mysql = require('mysql')//加载数据模块;
// 连接数据库
let con = mysql.createConnection({
    // 数据库设计
    host:'localhost',
    user:'root',
    password:'root',
    port:'3306',
    database:'test'
});
// 连接
con.connect(function(err){
    if(err){
        console.log(err);
        return
    }
    console.log('                    ok')
})

// ===================================查询用户登录账号密码是否已经注册

exports.login = (data,fun)=>{
    // console.log(data)
    let name = data.username;
    let password = data.password;
   
    let sql = `select * from user where name = ${name} and password = ${password} `;
    con.query(sql,(err,res)=>{
        if(err){
            console.log(err)
            return
        }   
        //  console.log(res)
       
            fun(res);

       
    });
}
// ====================================用户登录状态
exports.checkid = (data,fun)=>{
    let id = data.id
    let sql = `select id,name,phone from user where id = ${id}`;
    con.query(sql,(err,res)=>{
        if(err){
            console.log(err);
            return
        }
        fun(res);
    })
}
// ===================================查询用户名是否被注册
exports.checkname = function(data,fun){
    console.log(data.name);

    let sql = 'select name from user where name = '+data.name+' ';
    con.query(sql,function(err,result){
        if(err){
            console.log(err)
            return
        }
        fun(result);
    })
};
// ===================================用户注册信息

exports.addusers = function(data,fun){
    console.log(data);
    // 将用户注册信息插入数据库
    let sql = 'insert into user (name,password,phone) values (?,?,?)';
    let parmas = [data.username,data.password,data.phone];
    con.query(sql,parmas,function(err,result){
        if(err){
            console.log(err)
            return
        }
        fun(result);
    });
};