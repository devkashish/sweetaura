import express from "express";
import authRoutes from "./auth/auth.routes";
import sweetRoutes from "./sweets/sweet.routes";
import cors from "cors";

const app = express();
app.use(cors()); 
app.use(express.json());

// ✅ HEALTH ROUTE (MUST BE HERE)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

export default app;
