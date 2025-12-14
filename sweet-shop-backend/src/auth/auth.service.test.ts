import mongoose from "mongoose";
import { AuthService } from "./auth.service";

describe("Auth Service", () => {

  beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/sweetshop_test");
  });

  // 🔑 VERY IMPORTANT: clean DB before each test
  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should register a user successfully", async () => {
    const email = "test1@test.com";
    const password = "password123";

    const user = await AuthService.register(
      email,
      password,
      "USER"
    );

    expect(user).toBeDefined();
    expect(user.email).toBe(email);
  });

  it("should login a user and return token", async () => {
    const email = "test2@test.com";
    const password = "password123";

    // Arrange: register user first
    await AuthService.register(
      email,
      password,
      "USER"
    );

    // Act: login
    const token = await AuthService.login(email, password);

    // Assert
    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
  });

  it("should throw error for invalid credentials", async () => {
    await expect(
      AuthService.login("wrong@test.com", "wrongpassword")
    ).rejects.toThrow("Invalid credentials");
  });

});
