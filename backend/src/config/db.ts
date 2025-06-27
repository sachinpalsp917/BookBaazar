import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🟢 Database connected successfully");
  } catch (error) {
    console.log("⛔ Error connecting to Database");
    process.exit(1);
  }
};

export default connectToDatabase;
