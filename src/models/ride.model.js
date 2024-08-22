import mongoose, { Schema } from "mongoose";


const rideSchema = new Schema(
    {
        active: {
            type: Boolean
        },
        firstName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true
        },
        lastName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            // required: true, 
            lowercase: true,
            trim: true,
            index: true
        },
        mobile:{
            type: Number,
            required: true, 
        },
        aadhar:{
            type: Number,
            required: true, 
        },
        drivingLicense: {
            type: String,
            required: true, 
        },
        aadharImage:{
            type: String,
            // required: true
        },
        drivingLicenseImage:{
            type: String,
            // required: true
        },
        vehicle: {
            type: Schema.Types.ObjectId,
            ref: "Vehicle"
        }
    },
    {
        timestamps: true
    }
)



export const Ride = mongoose.model("Ride", rideSchema);