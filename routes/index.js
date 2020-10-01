const router = require("express").Router();
const auth = require("../middlewares/auth");

router.use("/auth", require("./auth"));
router.use("/quiz", auth, require("./quiz"));

module.exports = router;