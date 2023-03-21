const mongoose = require("mongoose");
const { schema } = mongoose;

const roomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    maxPeople: {
        type: Number,
        required: true
    },

    desc: {
        type: String,
        required: true
    },

    roomNumber: {
        type: [{ number: Number, unavaiableDates: { type: [Date]}}],
    },

},{timestamps: true});

const Room = new mongoose.model("Room", roomSchema);

module.exports = Room;