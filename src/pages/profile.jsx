import { useAuth } from "../contexts/authcontext";
import Card from "../components/card";
import Footer from "../components/footer";

export default function Profile() {
  const { user } = useAuth();

  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "NA";

  return (
    <>
    <div className="mt-20 p-4 bg-slate-50">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-blue-900 text-white flex items-center justify-center text-2xl font-bold">
          {initials}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            {user?.fullName || "Unknown User"}
          </h2>
          <p className="text-slate-500">{user?.email || "No email provided"}</p>
        </div>
      </div>

      <h3 className="text-lg font-bold mb-3 text-blue-900">Liked Houses</h3>
      {user?.likes?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {user.likes.map((h) => (
            <Card key={h.id} property={h} />
          ))}
        </div>
      ) : (
        <p className="text-slate-500 mb-8">You haven’t liked any houses yet.</p>
      )}

      <h3 className="text-lg font-bold mb-3 text-blue-900">Cart</h3>
      {user?.cart?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {user.cart.map((h) => (
            <Card key={h.id} property={h} />
          ))}
        </div>
      ) : (
        <p className="text-slate-500">Your cart is empty.</p>
      )}
    </div>
    <Footer/>
    </>
  );
}
