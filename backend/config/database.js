import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected with ${connection.host}`);
  } catch (e) {
    console.log("MongoDB connection Error");
  }
};
