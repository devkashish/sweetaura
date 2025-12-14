import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import type { Sweet } from "../types/Sweet";
import { useState } from "react";

interface Props {
  sweet: Sweet;
  onPurchased: () => void;
}

const SweetCard = ({ sweet, onPurchased }: Props) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handlePurchase = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to purchase");
      navigate("/login");
      return;
    }

    try {
      setSubmitting(true);
      await api.post(`/sweets/${sweet._id}/purchase`);
      toast.success("Sweet purchased 🍬");
      onPurchased(); // refetch, no reload
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Purchase failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden">
      <img src={sweet.imageUrl} alt={sweet.name} className="h-40 w-full object-cover" />
      <div className="p-4">
        <h3 className="font-semibold">{sweet.name}</h3>
        <p className="text-primary font-bold">₹{sweet.price}</p>
        <p className="text-sm text-gray-500">Stock: {sweet.quantity}</p>

        <button
          disabled={sweet.quantity === 0 || submitting}
          onClick={handlePurchase}
          className={`mt-4 w-full py-2 rounded-lg text-white ${
            sweet.quantity === 0 || submitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-rose-500 hover:bg-rose-600"
          }`}
        >
          {submitting ? "Processing…" : sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
        </button>
      </div>
    </div>
  );
};

export default SweetCard;
