let express = require("express");
let router = express.Router();
let accuracyRate = require("../mock/accuracyRate.json");

router.get('/data',(req, res)=>{
    res.send({ msg: "我是准确率的路由地址", chartsAccuracy: accuracyRate });
})

module.exports=router;