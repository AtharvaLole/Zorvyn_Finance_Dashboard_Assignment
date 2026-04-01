const router = require("express").Router();
const ctrl = require("../controllers/dashboard.controller");
const auth = require("../middleware/auth.middleware");

router.get("/summary", auth, ctrl.summary);
router.get("/categories", auth, ctrl.categories);
router.get("/trends", auth, ctrl.trends);

module.exports = router;