import { motion } from "framer-motion";
import { FiHeart, FiPlus } from "react-icons/fi";
import { useAuth } from "../contexts/authcontext";

export default function Card({ property }) {
  const { user, toggleLike, addToCart } = useAuth();
  const liked = user?.likes?.some(p => p.id === property.id);
  const inCart = user?.cart?.some(p => p.id === property.id);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="bg-white rounded-xl shadow-md relative min-w-{260px} cursor-pointer"
    >
      <img
        src={property.image}
        alt={property.title}
        className="h-48 w-full rounded-t-xl object-cover"
      />

      <div className="absolute top-2 right-2 flex flex-col gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(property);
          }}
          className={`p-1 rounded-full ${
            liked ? "bg-red-600 text-white" : "bg-white text-red-600"
          }`}
        >
          <FiHeart size={18} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(property);
          }}
          className={`p-1 rounded-full ${
            inCart ? "bg-green-700 text-white" : "bg-white text-green-700"
          }`}
        >
          <FiPlus size={18} />
        </button>
      </div>

      <div className="px-3 py-3">
        <h3 className="font-semibold text-sm truncate">
          {property.title}
        </h3>
        <p className="text-xs text-gray-500">{property.location}</p>
        <p className="text-green-800 font-bold text-sm">
          {property.price}
        </p>
      </div>
    </motion.div>
  );
}
