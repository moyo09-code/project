import { useAuth } from "../contexts/authcontext";
import Card from "../components/card";

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
    <div className="p-4">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-green-800 text-white flex items-center justify-center text-2xl font-bold">
          {initials}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user?.fullName || "Unknown User"}</h2>
          <p className="text-gray-500">{user?.email || "No email provided"}</p>
        </div>
      </div>

      <h3 className="text-lg font-bold mb-3">Liked Houses</h3>
      {user?.likes?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {user.likes.map((h) => (
            <Card key={h.id} property={h} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-8">You haven’t liked any houses yet.</p>
      )}

      <h3 className="text-lg font-bold mb-3">Cart</h3>
      {user?.cart?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {user.cart.map((h) => (
            <Card key={h.id} property={h} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
}
