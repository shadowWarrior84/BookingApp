const Hotel = require("../models/Hotel");

const createHotel = async (req, res, next)=>{
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        return res.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
}
const updateHotel = async (req, res, next)=>{
    

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true})
        return res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
}
const deleteHotel = async (req, res, next)=>{
    
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        return res.status(200).json("Hotel has been deleted");
    } catch (err) {
        next(err);
    }
}
const getHotel = async (req, res, next)=>{
    

    try {
        const getHotel = await Hotel.findById(req.params.id);
        return res.status(200).json(getHotel);
        
    } catch (err) {
        next(err);
    }
}
const getHotels = async (req, res, next)=>{
    
    const { min, max, ...others } = req.query

    try {
        const allHotel = await Hotel.find({...others, cheapestPrice: { $gt: min |1, $lt: max || 999}}).limit(req.query.limit);
        return res.status(200).json(allHotel);
    } catch (err) {
        next(err);
    }
}

const countByCity = async (req, res, next)=>{
    
    const cities = req.query.cities.split(",");

    try {
        const list = await Promise.all(cities.map(city=>{
            
            return Hotel.countDocuments({city:city})
        }))
        return res.status(200).json(list)
    } catch (err) {
        next(err);
    }
}

const countByType = async (req, res, next)=>{
    
    try {
        const hotelCount = await Hotel.countDocuments({type: "hotel"})
        const apartmentCount = await Hotel.countDocuments({type: "apartment"})
        const resortCount = await Hotel.countDocuments({type: "resort"})
        const villaCount = await Hotel.countDocuments({type: "villa"})
        const cabinCount = await Hotel.countDocuments({type: "cabin"})

        return res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount },
        ])
    } catch (err) {
        next(err);
    }
}

module.exports = {createHotel, updateHotel, deleteHotel, getHotel, getHotels, countByCity, countByType}
