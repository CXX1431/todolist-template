const express = require('express')
const Router = express.Router()

const mongoose = require('mongoose')

const Item = mongoose.model('todolist', new mongoose.Schema({
    // type数据结构类型，require：字段是否必填
    time: {type:String, require: true},
    title:{type:String, require: true},
    content:{type:String, require: true},
    status:{type:String, require: true}
}))

Router.post('/additem',function(req, res){
    const item = req.body;
    Item.create(item,function(err,doc){
        if(err){
            return res.json({code:1,msg:'添加失败'})
        } else {
            Item.find({}, function(err,doc){
                if(err){
                    return res.json({code:1,msg:'查询失败'})
                }
                return res.json({code:0,data:doc,msg:'添加成功'})
            })
        }
    })
})

Router.post('/deleteitem',function(req, res){
    const itemId = req.body._id;
    Item.deleteOne({'_id': itemId},function(err,doc){
        if(err){
            return res.json({code:1,msg:'删除失败'})
        } else {
            Item.find({}, function(err,doc){
                if(err){
                    return res.json({code:1,msg:'查询失败'})
                }
                return res.json({code:0,data:doc,msg:'删除成功'})
            })
        }
    })
})

Router.post('/updateitem',function(req, res){
    const itemId = req.body._id;
    const itemStatus = req.body.status === 'todo'?'done':'todo';
    Item.update({'_id': itemId}, {'$set': {'status': itemStatus}}, function(err, doc) {
        if(err){
            return res.json({code:1,msg:'更新失败'})
        } else {
            Item.find({}, function(err,doc){
                if(err){
                    return res.json({code:1,msg:'查询失败'})
                }
                return res.json({code:0,data:doc,msg:'更新成功'})
            })
        }
    })
})

Router.get('/allitems',function(req,res){
    Item.find({}, function(err,doc){
        if(err){
            return res.json({code:1,msg:'查询失败'})
        }
        return res.json({code:0,data:doc})
    })
})

module.exports = Router