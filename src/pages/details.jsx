import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById } from "../api/api";
import { useAuth } from "../contexts/authcontext";
import { FiHeart, FiPlus } from "react-icons/fi";
import Footer from "../components/footer";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, toggleLike, addToCart } = useAuth();

  useEffect(() => {
    async function loadProperty() {
      const data = await getPropertyById(id);
      setProperty(data);
      setLoading(false);
    }
    loadProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <div className="w-14 h-14 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!property) {
    return <p className="p-6 text-center text-slate-600">Property not found.</p>;
  }

  const liked = user?.likes?.some((p) => p.id === property.id);
  const inCart = user?.cart?.some((p) => p.id === property.id);

  return (
    <>
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
      <img
        src={property.image || "https://via.placeholder.com/800x400"}
        alt={property.title}
        className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg"
      />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900">
          {property.title}
        </h2>

        <div className="flex gap-3">
          <button
            onClick={() => toggleLike(property)}
            className={`p-2 rounded-full ${
              liked ? "bg-red-600 text-white" : "bg-white text-red-600"
            } hover:scale-110 transition`}
          >
            <FiHeart size={24} />
          </button>

          <button
            onClick={() => addToCart(property)}
            className={`p-2 rounded-full ${
              inCart ? "bg-blue-700 text-white" : "bg-white text-blue-700"
            } hover:scale-110 transition`}
          >
            <FiPlus size={24} />
          </button>
        </div>
      </div>

      <p className="text-slate-500 mt-2">{property.location}</p>
      <p className="text-blue-800 font-semibold mt-1">{property.price}</p>

      {property.description && (
        <div className="mt-4 text-slate-700">
          <h3 className="font-bold text-lg">Description</h3>
          <p>{property.description}</p>
        </div>
      )}

      {property.category && (
        <div className="mt-4 text-slate-700">
          <h3 className="font-bold text-lg">Category</h3>
          <p>{property.category}</p>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}
