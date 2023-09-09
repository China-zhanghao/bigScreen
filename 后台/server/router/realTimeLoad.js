let express = require("express");
let router = express.Router();
let realTimeLoad = require("../mock/realTimeLoad.json");

router.get("/data", (req, res) => {
  res.send({ msg: "我是实时负荷预测的路由地址", chartsRealTime: realTimeLoad });
});

module.exports = router;
