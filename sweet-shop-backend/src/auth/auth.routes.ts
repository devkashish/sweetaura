import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

// 🔑 PATHS ARE RELATIVE TO /api/auth
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;
