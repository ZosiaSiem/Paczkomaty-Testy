const express = require("express")
const router = express.Router();

//autoryzacja
const checkAuth = require("../middleware/checkAuth")


//importuje kontroler
const PaczkaController  = require("../controllers/paczki")
 
router.get("/", checkAuth, PaczkaController.paczki_get_all)

router.post("/", checkAuth, PaczkaController.paczki_add_new)
 
router.get("/:paczkaId", checkAuth, PaczkaController.paczki_get_by_id)
 
router.put("/:paczkaId", checkAuth, PaczkaController.paczki_update)
 
router.delete("/:paczkaId", checkAuth, PaczkaController.paczki_delete)
 
module.exports = router

