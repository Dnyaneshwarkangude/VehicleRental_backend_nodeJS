import dotenv from "dotenv";
import connectDB from "./db/db.js"
import { app } from "./app.js";

dotenv.config({
    path: "./env",
})


connectDB()
.then(() =>{
    app.on("error", (error) =>{
        console.log("ERR :", error);
    });

    app.listen(process.env.PORT || 4000, () =>{
        console.log(` Server is running at port : ${process.env.PORT}`);
    });
})
.catch((error) =>{
    console.log("MONGO DB connection failed !!!", error);
});





// import { MongoClient } from "mongodb";
// import {ApiResponse} from "./utils/ApiResponse.js"

// app.get("/register", async (req, res) =>{ 
//     const client = new MongoClient(process.env.MONGODB_URI);
//     await client.connect();
//     console.log("client connected")
//     const db = client.db("sample_mflix");
//     const collection = db.collection(req.body.collectionName)

//     const year = req.body.year;
//     const pipeline = [
//         {
//           $match: {
//             year: year,
//           },
//         },
//         {
//           $project: {
//             plot: 1,
//             title: 1,
//             _id: 0,
//           },
//         },
//       ];
      
     
//     const data = await collection.aggregate(pipeline).toArray();

//     await client.close();
   
//     // const data = await collection.find({}).toArray();
//     return res
//     .status(200)
//     .json(new ApiResponse(
//        200, 
//        data,
//        "Data sent successfully"
//     ))
// })