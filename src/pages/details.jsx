import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById } from "../api/api";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPropertyById(id)
      .then((res) => setProperty(res))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-14 h-14 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!property) {
    return <p className="text-center mt-20 text-red-500">Property not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
      <img src={property.images[0]} alt={property.title} className="w-full h-96 object-cover rounded-lg mb-6" />
      <p className="text-gray-700 mb-2">
        {property.location.address}, {property.location.city}, {property.location.state}
      </p>
      <p className="text-green-700 font-bold text-xl mb-4">
        {property.currency} {property.price.toLocaleString()}
        {property.paymentFrequency ? ` / ${property.paymentFrequency}` : ""}
      </p>
      <div className="flex gap-4 text-gray-600">
        <span>{property.details.bedrooms} Beds</span>
        <span>{property.details.bathrooms} Baths</span>
        <span>{property.details.parking} Parking</span>
        <span>{property.details.size}</span>
      </div>
    </div>
  );
}
