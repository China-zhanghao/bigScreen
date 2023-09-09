let express = require("express");
let router = express.Router();
let tomorrowPrediction = require("../mock/tomorrowPrediction.json");

router.get("/data", (req, res) => {
  res.send({ msg: "我是明日预测的路由地址",chartsTomorrow: tomorrowPrediction});
});

module.exports = router;
