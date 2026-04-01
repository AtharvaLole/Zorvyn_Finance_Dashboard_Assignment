const router = require("express").Router();
const ctrl = require("../controllers/record.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

router.post("/", auth, role(["admin"]), ctrl.createRecord);
router.get("/", auth, role(["analyst", "admin"]), ctrl.getRecords);
router.put("/:id", auth, role(["admin"]), ctrl.updateRecord);
router.delete("/:id", auth, role(["admin"]), ctrl.deleteRecord);

module.exports = router;