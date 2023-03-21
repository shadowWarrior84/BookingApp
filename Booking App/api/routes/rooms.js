const router = require("express").Router();
const res = require("express/lib/response");
const { createRoom, updateRoom, deleteRoom, getRoom, getRooms } = require("../controllers/room");
const Hotel = require("../models/Hotel");
const  createError  = require("../utils/error");
const { verifyAdmin } = require("../utils/verifyToken");



//CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE
router.put("/:id", verifyAdmin, updateRoom);

//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//GET
router.get("/:id", getRoom)

//GET ALL 
router.get("/", getRooms)

module.exports = router;