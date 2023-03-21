const mongoose = require("mongoose");
const { schema } = mongoose;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    },


},{timestamps: true});

const User = new mongoose.model("User", userSchema);

module.exports = User;