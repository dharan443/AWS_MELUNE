import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("CONNECTED to ",conn.connection.host)
    }
    catch{
        console.log("ERROR: connection cannot be established");
        process.exit(1)
    }
} 