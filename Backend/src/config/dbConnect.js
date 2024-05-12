import mongoose from "mongoose";

async function connectDatabase() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("Connected to MongoDB");
        return mongoose.connection;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error; 
    }
}

export default connectDatabase;