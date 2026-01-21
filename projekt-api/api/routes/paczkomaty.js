const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth")

const PaczkomatController = require("../controllers/paczkomaty")

router.get("/", checkAuth, PaczkomatController.paczkomaty_get_all)

router.post("/", checkAuth, PaczkomatController.paczkomaty_add_new)

router.get("/:paczkomatId", checkAuth, PaczkomatController.paczkomaty_get_by_id)

router.put("/:paczkomatId", checkAuth, PaczkomatController.paczkomaty_update)

router.delete("/:paczkomatId", checkAuth, PaczkomatController.paczkomaty_delete)

router.get("/:paczkomatId/paczki/", checkAuth, PaczkomatController.get_paczki_by_paczkomat)
module.exports = router