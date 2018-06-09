var express = require('express');
var router = express.Router();


var mysql = require('mysql');

// http://nodejs.org/docs/v0.6.5/api/fs.html#fs.writeFile
var fs = require('fs');

var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'root',
   database: 'deepread'
});

connection.connect();




//添加信息的SQL语句
var  addSql = 'INSERT INTO worker(wid,name,password) VALUES(?,?,?)';


  

/* GET home page. */
router.get('/', function(req, res){ 
  connection.query('select * from worker', function(err, results, fields) {
    if(err) throw err;

    fs.writeFile('table.json', JSON.stringify(results), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  });
  res.render('index',{users : JSON.parse(fs.readFileSync('table.json', 'utf8')), title: 'Express'});
});


//通过表单提交信息，添加入库。
router.post('/xxx', function(req, res){
  res.send('hello 你成功了')
  console.log(req.body.wid);
  var  addSqlParams = [req.body.wid, req.body.name, req.body.password];
  connection.query(addSql,addSqlParams,function (err, result) {
    if(err){
      console.log('[INSERT ERROR] - ',err.message);
      return;
    }   
  }); 
})

//删除数据库记录，前端使用ajax发送post请求，传入wid，后端进行参数匹配数据库记录的删除操作
router.post('/delete', function(req, res){
  res.send('点击了delete按钮')
  connection.query('delete from worker where wid = ?', req.body.wid, function(err, result){
    if(err){
      console.log('[INSERT ERROR] - ',err.message);
      return;
    }  
    console.log('删除完成')
  })
})



module.exports = router;
