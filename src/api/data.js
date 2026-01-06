const propertyTypes = [
  {
    type: "bungalow",
    basePrice: 90000,
    bedrooms: [2, 3, 4],
    bathrooms: [2, 3],
    size: [120, 180],
    locations: ["Ibadan", "Akure", "Abeokuta"]
  },
  {
    type: "duplex",
    basePrice: 300000,
    bedrooms: [4, 5],
    bathrooms: [4, 5],
    size: [250, 350],
    locations: ["Lekki", "Victoria Island", "Banana Island"]
  },
  {
    type: "apartment",
    basePrice: 150000,
    bedrooms: [1, 2, 3],
    bathrooms: [1, 2],
    size: [70, 130],
    locations: ["Lagos", "Abuja", "Port Harcourt"]
  },
  {
    type: "villa",
    basePrice: 450000,
    bedrooms: [4, 5, 6],
    bathrooms: [4, 6],
    size: [350, 500],
    locations: ["Lekki", "Eko Atlantic", "Victoria Island"]
  },
  {
    type: "penthouse",
    basePrice: 600000,
    bedrooms: [3, 4, 5],
    bathrooms: [3, 5],
    size: [220, 350],
    locations: ["Ikoyi", "Abuja", "Lekki"]
  }
];

const images = {
  bungalow: [
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    "https://images.unsplash.com/photo-1599423300746-b62533397364"
  ],
  duplex: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1600585154526-8c7d4c1c3a14"
  ],
  apartment: [
    "https://images.unsplash.com/photo-1572120360610-d971b9b78825",
    "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1"
  ],
  villa: [
    "https://images.unsplash.com/photo-1600585154370-be6161a56a0f",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde"
  ],
  penthouse: [
    "https://images.unsplash.com/photo-1610585154340-be6161a56a12",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227"
  ]
};

const amenitiesPool = [
  "Swimming Pool",
  "Gym",
  "Security",
  "Parking",
  "CCTV",
  "Balcony",
  "Elevator",
  "Generator",
  "Garden"
];

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const properties = Array.from({ length: 250 }, (_, i) => {
  const group = propertyTypes[Math.floor(i / 50)];
  const imageSet = images[group.type];

  const bedrooms = randomFrom(group.bedrooms);
  const bathrooms = randomFrom(group.bathrooms);
  const size = randomRange(group.size[0], group.size[1]);
  const price =
    group.basePrice +
    bedrooms * 15000 +
    bathrooms * 8000 +
    size * 120;

  return {
    id: i + 1,
    title: `${group.type.charAt(0).toUpperCase() + group.type.slice(1)} with ${bedrooms} Bedrooms`,
    type: group.type,
    location: randomFrom(group.locations),
    price: `$${price.toLocaleString()}`,
    bedrooms,
    bathrooms,
    size: `${size} sqm`,
    furnished: Math.random() > 0.5 ? "Furnished" : "Unfurnished",
    purpose: Math.random() > 0.6 ? "Rent" : "Sale",
    amenities: amenitiesPool.sort(() => 0.5 - Math.random()).slice(0, 4),
    images: imageSet,
    image: imageSet[0]
  };
});
