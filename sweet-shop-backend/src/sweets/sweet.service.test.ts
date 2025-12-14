import mongoose from "mongoose";
import { SweetService } from "./sweet.service";

describe("Sweet Service", () => {

  beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/sweetshop_test");
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  it("should create a sweet", async () => {
    const sweet = await SweetService.createSweet({
      name: "Jalebi",
      category: "Indian",
      price: 20,
      quantity: 100
    });

    expect(sweet._id).toBeDefined();
    expect(sweet.name).toBe("Jalebi");
  });

  it("should fetch all sweets", async () => {
    const sweets = await SweetService.getAllSweets();
    expect(sweets.length).toBeGreaterThan(0);
  });

  it("should search sweets by category", async () => {
    const sweets = await SweetService.searchSweets({ category: "Indian" });
    expect(sweets.length).toBeGreaterThan(0);
  });

  it("should search sweets by price range", async () => {
    // Arrange
    await SweetService.createSweet({
      name: "Barfi",
      category: "Indian",
      price: 20,
      quantity: 10
    });

    // Act
    const sweets = await SweetService.searchSweets({
      minPrice: 10,
      maxPrice: 25
    });

    // Assert
    expect(sweets.length).toBeGreaterThan(0);
  });

  it("should purchase a sweet and decrease quantity", async () => {
    const sweet = await SweetService.createSweet({
      name: "Peda",
      category: "Indian",
      price: 25,
      quantity: 5
    });

    const updated = await SweetService.purchaseSweet(sweet._id.toString());
    expect(updated.quantity).toBe(4);
  });

  it("should fail when purchasing out-of-stock sweet", async () => {
    const sweet = await SweetService.createSweet({
      name: "Soan Papdi",
      category: "Indian",
      price: 30,
      quantity: 0
    });

    await expect(
      SweetService.purchaseSweet(sweet._id.toString())
    ).rejects.toThrow("Out of stock");
  });

  it("should restock a sweet", async () => {
    const sweet = await SweetService.createSweet({
      name: "Mysore Pak",
      category: "Indian",
      price: 40,
      quantity: 2
    });

    const updated = await SweetService.restockSweet(
      sweet._id.toString(),
      10
    );

    expect(updated.quantity).toBe(12);
  });

});
