/**
 * Created by Administrator on 2017/1/23.
 */
/**
 * Created by dell on 2016/12/22.
 */
var express = require("express");
var mongoose = require("mongoose");
var app = express();
var db = mongoose.connect("mongodb://127.0.0.1:27017/food");
db.connection.on("err",function(){
    console.log(err);
})
db.connection.on("open",function(){
    console.log("链接成功");
})
//创建骨架模型
var Schema = mongoose.Schema;
var Message = new Schema({
    img:{type:String},//图片路径
    name:{type:String},//商品名称
    market_price:{type:Number},//原价
    price:{type:Number},//现价
    num:{type:Number},//商品数量
    bol:{type:String}
},{
    collection:"list"
});
//创建模型
var message = mongoose.model("list",Message);
app.get("/",function (req,res) {
    console.log(__dirname);
    res.sendFile(__dirname+"/index.html");
})
app.get("/add",function(req,res){
    var img = req.query.img;
    var name = req.query.name;
    var price = req.query.price;
    var market_price = req.query.market_price;
    var num = req.query.num;
    var bol = req.query.bol;
    message.find(
        {name:name},null,function(err,data){
            if(err){
                res.send('{"err":"1","msg":"查找失败"}')
            }else{
                if(data.length<=0){
                    message.create({
                        img:img,
                        name:name,
                        price:price,
                        market_price:market_price,
                        num:num,
                        bol:bol
                    },function(err,data){
                        if(err){
                            res.send('{"err":"1","msg":"数据储存失败"}')
                        }else{
                           res.send(data)
                        }
                    })
                }else{
                    var count1 = parseInt(data[0].num);
                    var count2 = 0;
                    count2 = 1 + parseInt(count1);
                    message.update({
                        name:name
                    },{num:count2},function(err,data){
                        if(err){
                            res.send('{"err":"2","msg":"添加失败"}')
                        }else{
                            res.send('{"err":"0","msg":"添加成功"}')
                        }
                    })
                }
            }
        })
})
app.get("/shuju",function(req,res){
    message.find({},null,{sort:{_id:-1}},function(err,data){
        if(err){
            res.send('{"err":"1","msg":"查找失败"}')
        }else{
            res.send(data)
        }
    })
})
app.get("/addNum",function(req,res){
    var _id = req.query._id;
    var num = req.query.num;
    num++;
    message.update({
        _id:_id
    },{num:num},function(err,data){
        if(err){
            res.send('{"err":"1","msg":"增加失败"}')
        }else{
            res.send(data)
        }
    })
})
app.get("/minus",function(req,res){
    var _id = req.query._id;
    var num = req.query.num;
    num--;
    message.update({
        _id:_id
    },{num:num},function(err,data){
        if(err){
            res.send('{"err":"1","msg":"增加失败"}')
        }else{
            res.send(data)
        }
    })
})
app.get("/rm",function(req,res){
    var _id = req.query._id;
    message.remove({
        _id:_id
    },function(err,data){
        if(err){
            res.send('{"err":"1","msg":"删除失败"}')
        }else{
            res.send(data)
        }
    })
})





app.all("*",function (req,res) {
    res.sendFile(__dirname+req.path)
})
app.listen(25535);





//购物页
//$scope.add=function (j) {
//        console.log(j);
//        var url = "http://localhost:8888/add?img="+j.img+"&name="+j.name+"&price="+j.price;
//        $http.get(url).success(function(){
//
//        });
//    }
//
//
////购物车页
//var url = "http://localhost:8888/shuju";
//    $http.get(url).success(function(json){
//        $scope.car = json;
//    })
