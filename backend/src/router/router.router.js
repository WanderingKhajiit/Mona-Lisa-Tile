const router = require("express").Router();
const controller = require("./router.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")



router
    .route("/:job_id/edit")
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed)
router
    .route("/new")
    .post(controller.create)
    .all(methodNotAllowed)
router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed)



module.exports = router