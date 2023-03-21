const Room = require("../models/Room")
const Hotel = require("../models/Hotel")

const createRoom = async (req, res, next)=>{
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id}})
        } catch (err) {
            next(err)
        }
        return res.status(200).json(savedRoom);
    } catch (err) {
        next(err);
    }
}

const updateRoom = async (req, res, next)=>{
    

    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true})
        return res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
}

const deleteRoom = async (req, res, next)=>{
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id}})
        } catch (err) {
            next(err)
        }
        return res.status(200).json("Room has been deleted");
    } catch (err) {
        next(err);
    }
}

const getRoom = async (req, res, next)=>{
    

    try {
        const getRoom = await Room.findById(req.params.id);
        return res.status(200).json(getRoom);
        
    } catch (err) {
        next(err);
    }
}

const getRooms = async (req, res, next)=>{
    
    
    try {
        const allRoom = await Room.find();
        return res.status(200).json(allRoom);
    } catch (err) {
        next(err);
    }
}

module.exports = { createRoom, updateRoom, deleteRoom, getRoom, getRooms }