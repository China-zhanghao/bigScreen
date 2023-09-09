let express = require("express");
let router = express.Router();
let monthLoad = require("../mock/monthLoad.json")

router.get("/data", (req, res) => {
  res.send({ msg: "我是月负荷的路由地址", chartsMonth:monthLoad});
});

module.exports = router;
