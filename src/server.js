import express from "express";
import connectDB from "./config/dbcon.js";
import productsRoutes from "./routes/products.js";
import { notFoundHandler } from "./middleware/errorHandler.js";
// Create express app
const port = process.env.PORT;
const app = express();


// Middleware

app.use(express.json());


app.use("/products", productsRoutes);


//App routes

app.get("/", async (req, res) => {
  res.status(200).json({ message: "API is ok and working" });
});


app.use(notFoundHandler);

//Create the connection to the database
const startDbCon = async () => {
  await connectDB(process.env.DB_URL);

  console.log("Connected to MongoDB database: ecommerce");
};
startDbCon();
//Start listening to the server on the defined port
app.listen(port, () =>
  console.log(`Server started and linstening to http://localhost:${port}`),
);

