import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Ride } from "../models/ride.model.js"


const newRide = asyncHandler(async(req, res) =>{
    const {firstName, lastName, email, mobile, aadhar, drivingLicense, vehicleNumber} = req.body
    if([firstName, lastName, mobile, aadhar, drivingLicense, vehicleNumber].some((field)=> field?.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }

    // handle aadhar and driving license image here

    const newRide = await Ride.create({
        active: true,
        firstName,
        lastName,
        email: email.trim() ? email : "",
        mobile,
        aadhar,
        drivingLicense,
        // vehicleNumber
    })

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "New ride saved successfully"
        )
    )
})

const activeRide = asyncHandler(async(req, res) =>{
    const activeRides = await Ride.aggregate([
        {
            $match:{
                active : true
            }
        }
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            activeRides,
            "Active rides fetched successfully"
        )
    )
})



export {
    newRide,
    activeRide
}