import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../services/api";
import type { Sweet } from "../types/Sweet";
import SweetFormModal from "../components/SweetFormModal";

const AdminDashboard = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);

  /* ======================
     LOAD SWEETS
  ====================== */
  const loadSweets = async () => {
    try {
      const res = await api.get("/sweets");
      setSweets(res.data);
    } catch {
      toast.error("Failed to load sweets");
    }
  };

  useEffect(() => {
    loadSweets();
  }, []);

  /* ======================
     DELETE SWEET
  ====================== */
  const deleteSweet = async (id: string) => {
    try {
      await api.delete(`/sweets/${id}`);
      toast.success("Sweet deleted");
      loadSweets();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ======================
     FILTER LOGIC
  ====================== */
  const filteredSweets = sweets.filter((sweet) => {
    const matchesSearch = sweet.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || sweet.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-800">
          Admin Dashboard
        </h2>

        <button
          onClick={() => {
            setEditingSweet(null);
            setModalOpen(true);
          }}
          className="bg-rose-400 hover:bg-rose-500 text-white px-6 py-2 rounded-full font-semibold"
        >
          + Add Sweet
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search sweets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/2 focus:ring-2 focus:ring-rose-300"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/3"
        >
          <option value="all">All Categories</option>
          <option value="Indian">Indian</option>
          <option value="Chocolate">Chocolate</option>
          <option value="Festival">Festival</option>
        </select>
      </div>

      {/* SWEETS GRID */}
      {filteredSweets.length === 0 ? (
        <p className="text-center text-gray-500">No sweets found</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSweets.map((sweet) => (
            <div
              key={sweet._id}
              className="bg-white rounded-2xl shadow-md p-5 flex flex-col"
            >
              <h3 className="font-heading font-semibold text-lg text-gray-800">
                {sweet.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Category: {sweet.category}
              </p>

              <p className="mt-2 font-semibold text-rose-500">
                ₹{sweet.price}
              </p>

              <p
                className={`text-sm mt-1 ${
                  sweet.quantity < 10
                    ? "text-red-500 font-semibold"
                    : "text-gray-600"
                }`}
              >
                Stock: {sweet.quantity}
              </p>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setEditingSweet(sweet);
                    setModalOpen(true);
                  }}
                  className="flex-1 bg-rose-100 text-rose-600 py-2 rounded-lg font-semibold hover:bg-rose-200"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteSweet(sweet._id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      <SweetFormModal
        isOpen={modalOpen}
        sweet={editingSweet}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          setModalOpen(false);
          loadSweets();
        }}
      />
    </motion.div>
  );
};

export default AdminDashboard;
