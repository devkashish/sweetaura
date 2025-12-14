import mongoose from "mongoose";
import { Sweet } from "./sweet.model";

describe("Sweet Model", () => {

  beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/sweetshop_test");
  });

  afterAll(async () => {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
    await mongoose.disconnect();
  });

  it("should create a valid sweet", async () => {
    const sweet = new Sweet({
      name: "Rasgulla",
      category: "Indian",
      price: 10,
      quantity: 50
    });

    const saved = await sweet.save();
    expect(saved._id).toBeDefined();
    expect(saved.name).toBe("Rasgulla");
  });

  it("should fail if price is negative", async () => {
    const sweet = new Sweet({
      name: "Barfi",
      category: "Indian",
      price: -5,
      quantity: 10
    });

    await expect(sweet.save()).rejects.toThrow();
  });

  it("should fail if quantity is negative", async () => {
    const sweet = new Sweet({
      name: "Ladoo",
      category: "Indian",
      price: 15,
      quantity: -1
    });

    await expect(sweet.save()).rejects.toThrow();
  });
});
