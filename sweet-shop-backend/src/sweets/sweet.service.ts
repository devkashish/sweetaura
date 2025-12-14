import { Sweet } from "./sweet.model";

interface CreateSweetDTO {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface SearchSweetDTO {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export class SweetService {

  static async createSweet(data: CreateSweetDTO) {
    return await Sweet.create(data);
  }

  static async getAllSweets() {
    return await Sweet.find();
  }

  static async searchSweets(filters: SearchSweetDTO) {
    const query: any = {};

    if (filters.name) {
      query.name = { $regex: filters.name, $options: "i" };
    }

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.price = {};
      if (filters.minPrice !== undefined) {
        query.price.$gte = filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        query.price.$lte = filters.maxPrice;
      }
    }

    return await Sweet.find(query);
  }

  // 🔽 Inventory logic (separate, clean methods)

  static async purchaseSweet(sweetId: string) {
    const sweet = await Sweet.findById(sweetId);

    if (!sweet) {
      throw new Error("Sweet not found");
    }

    if (sweet.quantity <= 0) {
      throw new Error("Out of stock");
    }

    sweet.quantity -= 1;
    await sweet.save();

    return sweet;
  }
  static async updateSweet(
  sweetId: string,
  data: {
    name?: string;
    category?: string;
    price?: number;
    quantity?: number;
  }
) {
  const sweet = await Sweet.findByIdAndUpdate(
    sweetId,
    data,
    { new: true }
  );

  if (!sweet) {
    throw new Error("Sweet not found");
  }

  return sweet;
}
static async deleteSweet(sweetId: string) {
  const sweet = await Sweet.findByIdAndDelete(sweetId);

  if (!sweet) {
    throw new Error("Sweet not found");
  }

  return sweet;
}



  static async restockSweet(sweetId: string, amount: number) {
    if (amount <= 0) {
      throw new Error("Invalid restock amount");
    }

    const sweet = await Sweet.findById(sweetId);

    if (!sweet) {
      throw new Error("Sweet not found");
    }

    sweet.quantity += amount;
    await sweet.save();

    return sweet;
  }
}
