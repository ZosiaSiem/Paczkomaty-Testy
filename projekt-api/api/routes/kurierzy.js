const express = require("express");
const router = express.Router();

//autoryzacja
const checkAuth = require("../middleware/checkAuth")


//importuje kontroler
const KurierController  = require("../controllers/kurierzy")
 
router.get("/", checkAuth, KurierController.kurierzy_get_all)

router.post("/", checkAuth, KurierController.kurierzy_add_new)
 
router.get("/:kurierId", checkAuth, KurierController.kurierzy_get_by_id)
 
router.put("/:kurierId", checkAuth, KurierController.kurierzy_update)
 
router.delete("/:kurierId", checkAuth, KurierController.kurierzy_delete)
 
module.exports = router
