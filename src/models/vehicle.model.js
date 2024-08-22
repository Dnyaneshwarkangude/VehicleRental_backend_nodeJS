import mongoose, { Schema } from "mongoose";


const vehicleSchema = new Schema(
    {
        vehicleName:{
            type: String,
            required: true,
        },
        vehicleImage: {
            type: String,
            required: true
        },
        vehicleType: {
            type: String,
            required: true
        },
        ratePerHr: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)