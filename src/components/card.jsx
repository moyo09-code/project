import { useNavigate } from "react-router-dom";

export default function Card({ property }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-72 bg-white rounded-2xl shadow-md overflow-hidden shrink-0 cursor-pointer hover:scale-105 transition-transform"
    >
      <img
        src={property.images[0]}
        alt={property.title}
        className="w-full h-44 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
        <p className="text-sm text-gray-500 mb-2">
          {property.location.address}, {property.location.city}
        </p>
        <p className="text-green-700 font-bold text-lg">
          {property.currency} {property.price.toLocaleString()}
          {property.paymentFrequency ? ` / ${property.paymentFrequency}` : ""}
        </p>

        <div className="flex justify-between mt-3 text-sm text-gray-600">
          <span>{property.details.bedrooms} Beds</span>
          <span>{property.details.bathrooms} Baths</span>
          <span>{property.details.parking} Parking</span>
        </div>
      </div>
    </div>
  );
}
