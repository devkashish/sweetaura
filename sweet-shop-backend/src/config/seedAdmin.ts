import {User} from "../auth/user.model";
import bcrypt from "bcrypt";

export const seedAdmin = async () => {
  const adminExists = await User.findOne({ role: "ADMIN" });
  if (adminExists) return;

  const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);

  await User.create({
    email: process.env.ADMIN_EMAIL,
    password: hashed,
    role: "ADMIN",
  });

  console.log("✅ Admin user created");
};
