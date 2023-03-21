const router = require("express").Router();

const { updateUser, deleteUser, getUser, getUsers } = require("../controllers/user");
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/verifyToken");

// router.get("/checkauthentication", verifyToken, (req, res, next)=>{
//     return res.status(200).json("You are logged in");
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next)=>{
//     return res.status(200).json("You are verified user")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=>{
//     return res.status(200).json("You are verified admin")
// })

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser)

//GET ALL 
router.get("/", verifyAdmin, getUsers)

module.exports = router;