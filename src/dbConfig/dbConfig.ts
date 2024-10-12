import mongoose from "mongoose";

export async function connect(){
    try {
        // typescript safety im sure ki ! isse string hi aayega
        mongoose.connect(process.env.MONGO_URI!)
        const connection=mongoose.connection
        connection.on("connected", () => {
            console.log("Connected to database!");
        });
        connection.on("error", (error) => {
            console.log("Failed to connect to database" +error);
            process.exit(); // exit the process if connection fails
        });
    } catch (error) {
        console.log("something went wrong while connecting to database")
        console.log(error);
    }
}