const router = require("express").Router();
const ctrl = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

router.get("/", auth, role(["admin"]), ctrl.getUsers);
router.patch("/:id", auth, role(["admin"]), ctrl.updateUser);
router.delete("/:id", auth, role(["admin"]), ctrl.deleteUser);

module.exports = router;