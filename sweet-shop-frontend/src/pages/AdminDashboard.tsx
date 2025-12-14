import { useEffect, useState } from "react";
import api from "../services/api";
import type { Sweet } from "../types/Sweet";
import SweetFormModal from "../components/SweetFormModal";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [open, setOpen] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);

  const loadSweets = async () => {
    try {
      const res = await api.get("/sweets");

      const normalized = res.data.map((s: any) => ({
        ...s,
        _id: String(s._id ?? s.id),
      }));

      setSweets(normalized);
    } catch {
      toast.error("Failed to load sweets");
    }
  };

  useEffect(() => {
    loadSweets();
  }, []);

  const deleteSweet = async (id: string) => {
    console.log("DELETE CLICKED:", id);
    try {
      await api.delete(`/sweets/${id}`);
      toast.success("Sweet deleted");
      setSweets((prev) => prev.filter((s) => s._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-6 py-10"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-800">
          Admin Dashboard
        </h2>

        <button
          onClick={() => {
            setEditingSweet(null);
            setOpen(true);
          }}
          className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-full font-semibold"
        >
          + Add Sweet
        </button>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sweets.map((sweet) => (
          <div
            key={sweet._id}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col"
          >
            <h3 className="font-semibold text-lg">{sweet.name}</h3>
            <p className="text-sm text-gray-500 mt-1">
              ₹{sweet.price} · Stock: {sweet.quantity}
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setEditingSweet(sweet);
                  setOpen(true);
                }}
                className="flex-1 bg-rose-400 hover:bg-rose-500 text-white py-2 rounded-lg text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => deleteSweet(sweet._id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <SweetFormModal
        isOpen={open}
        sweet={editingSweet}
        onClose={() => setOpen(false)}
        onSuccess={() => {
          setOpen(false);
          loadSweets();
        }}
      />
    </motion.div>
  );
};

export default AdminDashboard;