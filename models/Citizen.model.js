import mongoose from "mongoose";


const addressHistorySchema = new mongoose.Schema({
    country: {
        type: String,
        default: "",
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String
    },
    lga: {
        type:String,
    },
    street: {
        type: String
    },
    housenumber:{
        type: String
    },
    formattedAddress: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    datemovedin: {
        type: Date,
        required: true
    },

    datemovedout: {
        type: Date,
        // required: true
    }

})



 const CitizenSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,

    },

    email: {
        type:  String,
        required: true,
        unique: true
    },
    nin: {
        type: Number,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    
    History: {
        type:[addressHistorySchema],
        default: []
    }
 },
{
timestamps: true
}
)
const Citizen = mongoose.model("Citizen", CitizenSchema)
export default Citizen