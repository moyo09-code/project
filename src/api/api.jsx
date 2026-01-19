const BASE_URL = "https://your-api-provider.com"; 
const API_KEY = "YOUR_API_KEY_HERE"; 

export async function getProperties() {
  try {
    const res = await fetch(`${BASE_URL}/properties`, {
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return { data: [] };
  }
}

export async function getPropertyById(id) {
  try {
    const res = await fetch(`${BASE_URL}/properties/${id}`, {
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch property details");
    }
    const data = await res.json();
    return data; 
  } catch (error) {
    console.error("Error fetching property by id:", error);
    return null;
  }
}