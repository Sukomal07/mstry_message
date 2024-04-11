import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function connectDb(): Promise<void> {
  if (connection.isConnected) {
    console.log("Database already connected");
    return;
  }

  try {
    const res = await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "mstry_message",
    });
    console.log(res);
    connection.isConnected = res.connections[0].readyState;
    console.log("Database connection successfull");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDb;
