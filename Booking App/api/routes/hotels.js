const router = require("express").Router();
const res = require("express/lib/response");
const { createHotel, updateHotel, deleteHotel, getHotel, getHotels, countByCity, countByType } = require("../controllers/hotel");
const Hotel = require("../models/Hotel");
const  createError  = require("../utils/error");
const { verifyAdmin } = require("../utils/verifyToken");



//CREATE
router.post("/", verifyAdmin,createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

//GET
router.get("/find/:id", getHotel)

//GET ALL 
router.get("/", getHotels)

router.get("/countByCity", countByCity)
router.get("/countByType", countByType)

module.exports = router;