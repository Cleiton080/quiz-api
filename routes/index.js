const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/quiz", require("./quiz"));

module.exports = router;