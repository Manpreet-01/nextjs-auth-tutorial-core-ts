import mongoose from "mongoose";


export async function connect() {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Mongodb connected");
        });

        connection.on('error', (error) => {
            console.log("mongodb connection error", error);
            process.exit(1);
        });
    } catch (error) {
        console.log("Something went wrong in connecting to DB.", error);
    }
}