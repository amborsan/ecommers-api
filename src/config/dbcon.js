import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("successfully onnected!");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectDB;
