import dotenv from "dotenv";
import path from "path";

import { seedAdmin } from "./config/seedAdmin";



dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 3000;

connectDB().then(seedAdmin);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
