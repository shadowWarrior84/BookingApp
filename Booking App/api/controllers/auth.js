const User = require("../models/User");
const bcrypt = require("bcryptjs");
const createError = require("../utils/error");
const jwt = require("jsonwebtoken");
const jwtSecret = "afkjahkjafjahsjfh";
const register = async (req, res, next)=>{

    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });

        const savedUser = await newUser.save();
        return res.status(200).json(savedUser)
    } catch (err) {
        next(err);
    }
}

const login = async (req, res, next)=>{

    try {

    const user = await User.findOne({username: req.body.username});
    const isPasswordCorrect = await bcrypt.compareSync(req.body.password, user.password);

    if(!User) return next(createError(401, "User not found"))
    if(!isPasswordCorrect) return next(createError(400, "Wrong Password or Username"))

    const { password, isAdmin, ...otherDetails } = user._doc;

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin}, jwtSecret)
    return res.cookie("access_token", token, { httpOnly: true, }).status(200).json({otherDetails});

    // if(isPasswordCorrect))
    //     return res.status(200).json(savedUser)
    } catch (err) {
        next(err);
    }
}

module.exports = {register, login};