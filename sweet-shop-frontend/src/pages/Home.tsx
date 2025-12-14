import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import heroImage from "../assets/hero-sweet.jpg";
import laddoo from "../assets/featured/laddoo.jpg";
import kaju from "../assets/featured/kaju-katli.jpg";
import rasgulla from "../assets/featured/rasgulla.jpg";

const featuredSweets = [
  {
    name: "Laddoo",
    description: "Sweet, round, and full of joy",
    image: laddoo,
  },
  {
    name: "Kaju Katli",
    description: "Rich, smooth, and perfectly balanced",
    image: kaju,
  },
  {
    name: "Rasgulla",
    description: "Light, spongy, and delicately sweet",
    image: rasgulla,
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* FULL WIDTH BACKGROUND */}
      <div className="w-full bg-rose-50 overflow-hidden">

        {/* CENTERED CONTENT */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* HERO SECTION */}
          <section className="min-h-screen flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center w-full">

              {/* LEFT TEXT */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gray-800 leading-tight">
                  Welcome to{" "}
                  <span className="text-rose-500">Sweetaura</span>
                </h1>

                <motion.h2
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-3 text-2xl sm:text-3xl font-heading font-semibold text-rose-600"
                >
                  Where Sweetness Has a Soul
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 text-gray-600 text-base sm:text-lg max-w-md"
                >
                  Handcrafted Indian sweets inspired by tradition and perfected
                  with a modern touch. Every celebration begins with Sweetaura.
                </motion.p>

                {/* BUTTON WITH ARROW */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/sweets")}
                  className="mt-10 inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition"
                >
                  Explore Sweets
                  <motion.span
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ArrowRightIcon className="w-5 h-5" />
                  </motion.span>
                </motion.button>
              </motion.div>

              {/* RIGHT IMAGE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex justify-center"
              >
                <div className="bg-white rounded-3xl shadow-2xl p-4">
                  <img
                    src={heroImage}
                    alt="Traditional Indian sweets platter"
                    className="rounded-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg object-cover"
                  />
                </div>
              </motion.div>

            </div>
          </section>

          {/* FEATURED SWEETS */}
          <section className="py-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-heading font-bold text-center text-gray-800"
            >
              Featured Sweets
            </motion.h2>

            <p className="mt-4 text-center text-gray-600 max-w-md mx-auto">
              A few favorites our customers keep coming back for.
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {featuredSweets.map((sweet, index) => (
                <motion.div
                  key={sweet.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden"
                >
                  <img
                    src={sweet.image}
                    alt={sweet.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-6 text-center">
                    <h3 className="font-heading font-semibold text-lg text-gray-800">
                      {sweet.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2">
                      {sweet.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </motion.div>
  );
};

export default Home;
