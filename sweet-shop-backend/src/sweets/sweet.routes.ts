import { Router } from "express";
import { SweetController } from "./sweet.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeAdmin } from "../middlewares/role.middleware";

const router = Router();

/* ✅ PUBLIC ROUTES (NO AUTH) */
router.get("/", SweetController.getAllSweets);
router.get("/search", SweetController.searchSweets);

/* 🔒 AUTH REQUIRED */
router.post("/:id/purchase", authenticate, SweetController.purchaseSweet);

/* 🔐 ADMIN ONLY */
router.post("/", authenticate, authorizeAdmin, SweetController.createSweet);
router.post("/:id/restock", authenticate, authorizeAdmin, SweetController.restockSweet);
router.put("/:id", authenticate, authorizeAdmin, SweetController.updateSweet);
router.delete("/:id", authenticate, authorizeAdmin, SweetController.deleteSweet);

export default router;
