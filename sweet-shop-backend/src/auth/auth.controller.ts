import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  static async register(req: Request, res: Response) {
  const { email, password } = req.body;

  await AuthService.register(email, password);
  res.status(201).json({ message: "User registered successfully" });
}


 static async login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const result = await AuthService.login(email, password);

    res.json({
      token: result.token,
      user: result.user
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
}

}
