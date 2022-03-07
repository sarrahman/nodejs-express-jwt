import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/index.mjs";
import cookieParser from "cookie-parser";

dotenv.config();

try {
  mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection;
  db.on("error", (err) => {
    console.log(err);
  });
  db.once("open", () => console.log("database connected..."));
} catch (error) {
  console.log(error);
}

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`server is listening on port ${port}...`));
