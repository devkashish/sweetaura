import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import type { Sweet } from "../types/Sweet";

type Props = {
  isOpen: boolean;
  sweet: Sweet | null;
  onClose: () => void;
  onSuccess: () => void;
};

const SweetFormModal = ({ isOpen, sweet, onClose, onSuccess }: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sweet) {
      setName(sweet.name);
      setPrice(sweet.price);
      setQuantity(sweet.quantity);
      setCategory(sweet.category || "");
      setImage(sweet.imageUrl || "");
    } else {
      setName("");
      setPrice(0);
      setQuantity(0);
      setCategory("");
      setImage("");
    }
  }, [sweet]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { name, price, quantity, category, image };

      if (sweet) {
        await api.put(`/sweets/${sweet._id}`, data);
        toast.success("Sweet updated!");
      } else {
        await api.post("/sweets", data);
        toast.success("Sweet added!");
      }
      onSuccess();
      onClose();
    } catch {
      toast.error("Operation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative"
        >
          <h3 className="text-xl font-heading font-semibold mb-5 text-gray-800">
            {sweet ? "Edit Sweet" : "Add Sweet"}
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              placeholder="Sweet Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-rose-300 focus:ring-2 outline-none"
              required
            />

            <input
              type="number"
              placeholder="Price (₹)"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="border rounded-lg px-4 py-2 focus:ring-rose-300 focus:ring-2 outline-none"
              required
            />

            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded-lg px-4 py-2 focus:ring-rose-300 focus:ring-2 outline-none"
              required
            />

            <input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-rose-300 focus:ring-2 outline-none"
              required
            />

            <input
              placeholder="Image URL (optional)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-rose-300 focus:ring-2 outline-none"
            />

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="border border-gray-400 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-full font-semibold"
              >
                {loading ? "Saving..." : sweet ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SweetFormModal;