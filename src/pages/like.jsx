import { useAuth } from "../contexts/authcontext";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

export default function Like() {
  const { user, toggleLike } = useAuth();
  const likedItems = user?.likes || [];

  if (likedItems.length === 0) {
    return <p className="mt-20 p-6 text-center text-slate-500">No liked properties yet.</p>;
  }

  return (
   <>
    <div className="h-screen">
      <div className="mt-20 p-4 lg:p-8 grid gap-4 grid-cols-2 lg:grid-cols-3 bg-slate-50 ">
      {likedItems.map((property) => (
        <div key={property.id} className="relative bg-slate-200 shadow-sm rounded hover:-translate-y-1 transition">
          <button
            onClick={() => {
              if (confirm("Remove from likes?")) toggleLike(property);
            }}
            className="absolute top-2 right-2 text-red-600 font-bold text-xl hover:text-red-800"
          >
            ✕
          </button>

          <Link to={`/property/${property.id}`}>
            <img
              src={property.image || "https://via.placeholder.com/400"}
              alt={property.title}
              className="h-56 w-full object-cover rounded-t"
            />
          </Link>

          <div className="p-4">
            <h3 className="text-blue-900 font-bold">{property.title}</h3>
            <p className="text-slate-500">{property.location}</p>
            <p className="text-blue-800 font-semibold">{property.price}</p>
          </div>
        </div>
      ))}
    </div>
      </div>    
      <Footer/>
   </>
  );
}
