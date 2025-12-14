import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./user.model";

const JWT_SECRET = process.env.JWT_SECRET as string;



export class AuthService {

static async register(
  email: string,
  password: string,
  role: "ADMIN" | "USER" = "USER"
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
    role
  });

  await user.save();
  return user;
}

static async login(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  // 🔥 RETURN USER DATA (SAFE FIELDS ONLY)
  return {
    token,
    user: {
      email: user.email,
      role: user.role
    }
  };
}
}
