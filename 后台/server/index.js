let express = require('express');
let app = express();
// 设置跨域
app.use(function(req,res,next){
res.header('Access-Control-Allow-Origin','*');
res.header('Access-Control-Allow-Headers','Content-TypeContent-Iength,Authorization,Accept,X-Requested-With,yourHeaderFeild');
res.header('Access-Control-Allow-Methods','PUT,POST,GETDELETE,OPTIONS');
next();
})
// 引入路由文件
let accuracyRate =require("./router/accuracyRate")
let monthLoad = require("./router/monthLoad");
let tomorrowPrediction = require("./router/tomorrowPrediction");
let realTimeLoad = require("./router/realTimeLoad");

app.use("/accuracyRate", accuracyRate);
app.use("/monthLoad", monthLoad);
app.use("/tomorrowPrediction", tomorrowPrediction);
app.use("/realTimeLoad", realTimeLoad);

app.listen(8888)