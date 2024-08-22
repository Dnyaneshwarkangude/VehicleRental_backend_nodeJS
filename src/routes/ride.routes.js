import { Router } from "express";
import { activeRide, newRide } from "../controllers/ride.controller.js";


const rideRouter = Router()

rideRouter.route("/newRide").post(newRide)
rideRouter.route("/activeRide").get(activeRide)

export default rideRouter