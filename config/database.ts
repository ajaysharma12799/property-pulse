import mongoose from "mongoose";

let connected: boolean = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // If Database is already connected don't connect again
  if (connected) {
    console.log("MongoDB is already Connected");
    return;
  }

  try {
    mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Connection Error --> ", error);
  }
};

export default connectDB;
