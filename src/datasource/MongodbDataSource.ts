import mongoose from "mongoose";
import { Datasource } from "./types/datasource";

// should implement a type as a contract for a datasource can be.
export class MongodbDataSource implements Datasource {
    private connectionString: string;

    constructor(connectionString: string) {
        this.connectionString = connectionString;
    }

    public async connect(): Promise<void> {
        try {
            await mongoose.connect(this.connectionString);
            console.log("MongoDB connection successful");
        } catch (err) {
            console.error("MongoDB connection error:", err);
            throw err;
        }
    }

    public async close(): Promise<void> {
        try {
            await mongoose.disconnect();
            console.log("Mongoose connection closed.");
        } catch (err) {
            console.error("Error closing the mongoose connection", err);
            throw err;
        }
    }
}
