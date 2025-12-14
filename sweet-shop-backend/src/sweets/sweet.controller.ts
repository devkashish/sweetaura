import { Response } from "express";
import { SweetService } from "./sweet.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export class SweetController {

  static async createSweet(req: AuthRequest, res: Response) {
    try {
      const sweet = await SweetService.createSweet(req.body);
      res.status(201).json(sweet);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllSweets(req: AuthRequest, res: Response) {
    const sweets = await SweetService.getAllSweets();
    res.json(sweets);
  }

  static async searchSweets(req: AuthRequest, res: Response) {
    const sweets = await SweetService.searchSweets(req.query as any);
    res.json(sweets);
  }

  static async purchaseSweet(req: AuthRequest, res: Response) {
    try {
      const sweet = await SweetService.purchaseSweet(req.params.id);
      res.json(sweet);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  static async updateSweet(req: AuthRequest, res: Response) {
  try {
    const updatedSweet = await SweetService.updateSweet(
      req.params.id,
      req.body
    );
    res.json(updatedSweet);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
static async deleteSweet(req: AuthRequest, res: Response) {
  try {
    await SweetService.deleteSweet(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}


  static async restockSweet(req: AuthRequest, res: Response) {
    try {
      const { amount } = req.body;
      const sweet = await SweetService.restockSweet(req.params.id, amount);
      res.json(sweet);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
