import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

type Sweet = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  imageUrl: string;
};

const Sweets = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch sweets
  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/sweets");
        setSweets(res.data);
      } catch {
        toast.error("Failed to load sweets");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // 🔹 Purchase handler (NO reload)
  const handlePurchase = async (id: string) => {
    try {
      await api.post(`/sweets/${id}/purchase`);

      setSweets((prev) =>
        prev.map((s) =>
          s._id === id
            ? { ...s, quantity: s.quantity - 1 }
            : s
        )
      );

      toast.success("Sweet purchased 🍬");
    } catch {
      toast.error("Purchase failed");
    }
  };

  // 🔹 Extract categories
  const categories = useMemo(() => {
    const set = new Set(sweets.map((s) => s.category));
    return ["all", ...Array.from(set)];
  }, [sweets]);

  // 🔹 Search + filter
  const filteredSweets = useMemo(() => {
    return sweets.filter((s) => {
      const matchSearch = s.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "all" || s.category === category;

      return matchSearch && matchCategory;
    });
  }, [sweets, search, category]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-rose-500">
        Loading sweets…
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="bg-rose-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* 🔍 SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Search sweets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-rose-300 outline-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border bg-white focus:ring-2 focus:ring-rose-300 outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All Categories" : c}
              </option>
            ))}
          </select>
        </div>

        {/* 🍭 SWEETS GRID */}
        {filteredSweets.length === 0 ? (
          <p className="text-center text-gray-500">
            No sweets found 🍥
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredSweets.map((sweet) => (
              <motion.div
                key={sweet._id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <img
                  src={sweet.imageUrl}
                  alt={sweet.name}
                  className="h-48 w-full object-cover"
                />

                <div className="p-5 text-center">
                  <h3 className="font-heading font-semibold text-lg">
                    {sweet.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {sweet.category}
                  </p>

                  <p className="mt-2 font-semibold text-rose-500">
                    ₹{sweet.price}
                  </p>

                  <p
                    className={`text-sm mt-1 ${
                      sweet.quantity <= 5
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    Stock: {sweet.quantity}
                  </p>

                  <button
                    disabled={sweet.quantity === 0}
                    onClick={() => handlePurchase(sweet._id)}
                    className={`mt-4 w-full py-2 rounded-full font-semibold transition ${
                      sweet.quantity === 0
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-rose-400 hover:bg-rose-500 text-white"
                    }`}
                  >
                    {sweet.quantity === 0
                      ? "Out of Stock"
                      : "Purchase"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Sweets;