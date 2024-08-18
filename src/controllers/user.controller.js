import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse} from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


const options = {
    httpOnly: true,
    secure: true
}

const generateAccessAndRefreshTokens = async (userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens")
    }
}


const registerUser = asyncHandler(async (req, res) =>{

    const {firstName, lastName, email, password} = req.body 
    if( [firstName, lastName, email, password].some((field)=> field?.trim() === "") ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({ email })
    if(existedUser){
        throw new ApiError( 409, "User with email is already exists")
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password")
    if(!createdUser){
        throw new ApiError(500, "Something went worng while registering a user")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            createdUser,
            "User registered Successfully"
        )
    )
})

const loginUser = asyncHandler(async (req, res) =>{
    const { email, password } = req.body 
    if(!email){
        throw new ApiError(400, "email is required")
    }

    const user = await User.findOne({ email })
    if(!user){
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
            "User logged In successfully"
        )
    )
})

const logoutUser = asyncHandler(async(req, res) =>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken: "",
            }
        },
        {
            new: true
        }
    )

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "User logged Out"
        )
    )
})

export {
    registerUser,
    loginUser,
    logoutUser
}