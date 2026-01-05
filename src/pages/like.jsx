import { useAuth } from "../contexts/authcontext";
import { Link } from "react-router-dom";

export default function Like() {
  const { user, toggleLike } = useAuth();
  const likedItems = user?.likes || [];

  if (likedItems.length === 0) {
    return <p className="p-6 text-center text-gray-500">No liked properties yet.</p>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {likedItems.map((property) => (
        <div
          key={property.id}
          className="relative bg-white shadow-md rounded hover:-translate-y-1 transition"
        >
          <button
            onClick={() => {
              if (confirm("Remove from likes?")) toggleLike(property);
            }}
            className="absolute top-2 right-2 text-red-600 font-bold text-xl sm:text-2xl hover:text-red-800"
          >
            ✕
          </button>

          <Link to={`/property/${property.id}`}>
            <img
              src={property.image || "https://via.placeholder.com/400"}
              alt={property.title}
              className="h-48 sm:h-56 lg:h-64 w-full object-cover rounded-t"
            />
          </Link>

          <div className="p-4">
            <h3 className="text-green-900 font-bold text-base sm:text-lg">{property.title}</h3>
            <p className="text-gray-500 text-sm sm:text-base">{property.location}</p>
            <p className="text-green-800 font-semibold text-sm sm:text-base">{property.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
