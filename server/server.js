const express = require('express')
//express中间件，必须加载，解析数据
const bodyParser = require('body-parser')
//使用axios访问后端，需要在package.json中增加 proxy 配置
const app = express()
const mongoose = require('mongoose')
const todolistRouter = require('./todolist')

const DB_URL = 'mongodb://localhost:27017/todolist'

mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
    console.log('mongo connection success')
})

//使用  app.get(path,(request,response){})
app.get('/', function(req,res){
    res.json('hello todolist')
})

// app.use(bodyParser.urlencoded({    
//     extended: true
//   }));
app.use(bodyParser.json())
app.use('/todolist', todolistRouter)

app.listen(9093, function(){
    console.log('server start at port 9093')
})