const Hotel = require("../models/Hotel");
const User = require("../models/User");

const createUser = async (req, res, next)=>{
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();
        return res.status(200).json(savedUser);
    } catch (err) {
        next(err);
    }
}
const updateUser = async (req, res, next)=>{
    

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true})
        return res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
}
const deleteUser = async (req, res, next)=>{
    
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("Hotel has been deleted");
    } catch (err) {
        next(err);
    }
}
const getUser = async (req, res, next)=>{
    

    try {
        const getUser = await User.findById(req.params.id);
        return res.status(200).json(getUser);
        
    } catch (err) {
        next(err);
    }
}
const getUsers = async (req, res, next)=>{
    

    try {
        const allUser = await User.find();
        return res.status(200).json(allUser);
    } catch (err) {
        next(err);
    }
}

module.exports = {createUser, updateUser, deleteUser, getUser, getUsers}